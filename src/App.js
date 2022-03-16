import './App.css';
import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from "react-router-dom";
import CreatorHome from './CreatorHome/CreatorHome';
import EditPost from './EditPost/EditPost';
import MyAccount from './MyAccount/MyAccount';
import NewPost from './NewPost/NewPost';
import Home from './Home/Home';

import { Connection, PublicKey, clusterApiUrl, Transaction, ConfirmOptions, Commitment } from '@solana/web3.js';
import { Program, Provider, web3 } from '@project-serum/anchor';
import kp from './keypair.json'
import idl from './idl.json';
import { MyUtil } from "./utils/my_util";
import './index.css';
import CreatorPage from './CreatorPage/CreatorPage';
import PostPage from './PostPage/PostPage';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

const arr = Object.values(kp._keypair.secretKey)
const secret = new Uint8Array(arr)

export const baseAccount = web3.Keypair.fromSecretKey(secret)
export const programID = new PublicKey(idl.metadata.address);
export const network = clusterApiUrl('devnet');
export const opts = {
  preflightCommitment: "processed"
}




export const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
        connection, window.solana, opts.preflightCommitment,
    );
    return provider;
}

export const UserContext = React.createContext({}); 

export default function App() { 
  const [walletAddress, setWalletAddress] = useState("");
  const [solanaPrice, setSolanaPrice] = useState(null);
  const [users, setUsers] = useState([]);
  const [connectedUser, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [creators, setCreators] = useState([]); 
  
  const value = {  
    walletAddress, setWalletAddress, 
    solanaPrice, setSolanaPrice,
    users, setUsers,
    connectedUser, setUser,
    creators, setCreators, 
    refreshData, setRefreshData,
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  const checkIfWalletIsConnected = async () => {
    try {
        const solana  = window.solana;

        if (solana) {
          if (solana.isPhantom) {
              // console.log('Phantom wallet found!');

              var solanaPrice = await MyUtil.getSolanaPrice();
              // console.log(solanaPrice)
              setSolanaPrice(solanaPrice.usd);
              
              const response = await solana.connect({ onlyIfTrusted: true });
              /*console.log(
                'Connected with Public Key:',
                response.publicKey.toString()
              );*/

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
    // console.log("wallet is set: ", walletAddress)
    if (walletAddress) {
        // console.log('Fetching Users...');
        getUsers()
        setRefreshData(false);
    }
  }, [walletAddress, refreshData]);

  
  const getUsers = async () => {
    try { 
        const provider = getProvider();
        const program = new Program(idl, programID, provider);
        const account = await program.account.baseAccount.fetch(baseAccount.publicKey);

        // console.log("Got the account", account)
        setUsers(account.users)
        // console.log(account.users); 
        // console.log(provider.wallet.publicKey.toString());
        var user = account.users.find((user) => user.userAddress.toString() === provider.wallet.publicKey.toString());
        // console.log(user)

        if(user != null && walletAddress != null){
            // console.log("user registered");
            setUser(user);
            /*account.users.forEach(
                (user)=> console.log(user.userAddress.toString()
            ));*/
        }

        setCreators(account.users.filter((user) => user.creator)); 
        /*
          if(user && user.creator){
            console.log("navigate to creator")
            navigate('/', {replace: true})
          }
          else{
            console.log("navigate to profile")
            navigate('/creator/account', {replace: true})  
          }
        */
      } catch (error) {
        // console.log("Error in getUsers: ", error)
        setUsers(null);
        setUser(null);
    }
} 
  
 
  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<CreatorHome />} />
            <Route path="/:creator" element={<CreatorPage />} />
            <Route path="/creator/account" element={<MyAccount />} />
            <Route path="/post/edit" element={<EditPost />} />
            <Route path="/post/new" element={<NewPost />} />
            <Route path="/post/view" element={<PostPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
} 
