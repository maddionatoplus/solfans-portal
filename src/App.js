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
import { useBetween } from 'use-between';
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

// Make a custom hook with your future shared state
const useConnectionState = () => { 

};

// Make a custom hook for sharing your form state between any components
export const useSharedState = () => useBetween(useConnectionState);

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
  const [creators, setCreators] = useState([]); 
  const value = { 
    walletAddress, setWalletAddress, 
    solanaPrice, setSolanaPrice,
    users, setUsers,
    connectedUser, setUser,
    creators, setCreators, 
  }
 
  return (
    <UserContext.Provider value={value}>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:creator" element={<CreatorPage />} />
            <Route path="/creator/home" element={<CreatorHome />} />
            <Route path="/creator/account" element={<MyAccount />} />
            <Route path="/post/edit" element={<EditPost />} />
            <Route path="/post/new" element={<NewPost />} />
            <Route path="/post" element={<PostPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
} 
