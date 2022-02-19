import { Program } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { baseAccount, getProvider, programID, useSharedState } from "../App";
import { MyUtil } from "../utils/my_util";
import idl from '../idl.json'; 

export default function Home() {
    
  const { walletAddress, setWalletAddress,  setSolanaPrice, setUsers, setUser, setCreators } = useSharedState();
    
    const checkIfWalletIsConnected = async () => {
        try {
            const solana  = window.solana;

            if (solana) {
            if (solana.isPhantom) {
                console.log('Phantom wallet found!');

                
                var solanaPrice = await MyUtil.getSolanaPrice();
                console.log(solanaPrice)
                setSolanaPrice(solanaPrice.usd);

                /*
                * The solana object gives us a function that will allow us to connect
                * directly with the user's wallet!
                */
                const response = await solana.connect({ onlyIfTrusted: true });
                console.log(
                'Connected with Public Key:',
                response.publicKey.toString()
                );

                /*
                * Set the user's publicKey in state to be used later!
                */
                setWalletAddress(response.publicKey.toString());

            }
            } else {
            alert('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const onLoad = async () => {
        await checkIfWalletIsConnected();
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    
    useEffect(() => {
        if (walletAddress) {
            console.log('Fetching Users...');
            getUsers()
        }
    }, [walletAddress]);
    
    const getUsers = async () => {
        try { 
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

            console.log("Got the account", account)
            setUsers(account.users)
            console.log(account.users); 
            console.log(provider.wallet.publicKey.toString());
            var user = account.users.find((user) => user.userAddress.toString() === provider.wallet.publicKey.toString());
            if(user != null && walletAddress != null){
                console.log("user registered");
                setUser(user);
                account.users.forEach(
                    (user)=> console.log(user.userAddress.toString()
                ));
                setCreators(account.users.filter((user)=> user.userAddress.toString() !== walletAddress.toString() && user.creator))
            }
            else{
                setCreators(account.users.filter((user) => user.creator));
                addUser();
            }

            } catch (error) {
            console.log("Error in getUsers: ", error)
            setUsers([]);
            setUser(null);
        }
    }

    
  const addUser = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      
      await program.rpc.addUser({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
        },
      });
 
      await getUsers();
    } catch (error) {
      console.log("Error creating user:", error)
    }
  }; 
    
    return <h2>Home</h2>;
  }