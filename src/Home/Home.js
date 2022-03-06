

import { useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../App";


export default function Home() {
   
  const navigate = useNavigate();
  const {walletAddress, setWalletAddress, users, setUsers, setUser, setCreators } = useContext(UserContext);
  
  
  /*
    const connectWallet = async () => {
      const { solana } = window;

      if (solana) {
        const response = await solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        setWalletAddress(response.publicKey.toString()); 
      }
    };
  */

  return (
      <div className="App">
          {/* {!walletAddress && renderNotConnectedContainer()} */}
      </div>
    )
    ;
  }