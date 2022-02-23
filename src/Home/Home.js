import { Program } from "@project-serum/anchor";
import { baseAccount, getProvider, programID } from "../App";
import idl from '../idl.json'; 
import { useEffect, useContext } from "react";
import { MyUtil } from "../utils/my_util";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../App";

export default function Home() {
   
  const navigate = useNavigate();
  const {walletAddress, setWalletAddress, setSolanaPrice, setUsers, setUser, setCreators } = useContext(UserContext);
   
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
      console.log("wallet is set: ", walletAddress)
      if (walletAddress) {
          console.log('Fetching Users...');
          getUsers()
      }
  }, [walletAddress]);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );


  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString()); 
    }
  };
  
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
              console.log(account.users.filter((user)=> user.userAddress.toString() !== walletAddress && user.creator))
              setCreators(account.users.filter((user)=> user.userAddress.toString() !== walletAddress && user.creator))
          }
          else{
              setCreators(account.users.filter((user) => user.creator));
              addUser();
          } 

          console.log("navigate to creator")
          navigate('/creator/home', {replace: true})
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
    
  return (
      <div className="App">
          {!walletAddress && renderNotConnectedContainer()}
      </div>
    )
    ;
  }