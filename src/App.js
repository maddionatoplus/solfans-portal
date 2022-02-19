import './App.css';
import React, { useState } from "react";
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
  const [walletAddress, setWalletAddress] = useState("");
  const [solanaPrice, setSolanaPrice] = useState(null);
  const [users, setUsers] = useState([]);
  const [connectedUser, setUser] = useState(null);
  const [creators, setCreators] = useState([]);
  const [addUserValue, setAddUserValue] = useState('');

  return {
      walletAddress, setWalletAddress, 
      solanaPrice, setSolanaPrice,
      users, setUsers,
      connectedUser, setUser,
      creators, setCreators,
      addUserValue, setAddUserValue,
  };
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


export default function App() {
 
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator" element={<CreatorHome />} />
          <Route path="/edit" element={<EditPost />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/new" element={<NewPost />} />
      </Routes>
    </Router>
  );
} 
