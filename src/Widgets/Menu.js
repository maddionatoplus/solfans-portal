
import solfansLogo from "../assets/solfans_logo.png" 
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export default function Menu(connectedUser, isCreator = false) {
    const navigate = useNavigate();
    const {setUser, setWalletAddress, users, walletAddress} = useContext(UserContext);
    
    const disconnect = () => {
        console.log("disconnect")    
        const solana  = window.solana;
        if (solana) {
            if (solana.isPhantom) {
                solana.disconnect();
                setUser(null)
                setWalletAddress(null)
                navigate('/', {replace: true})
                console.log("navigate")    
            }
        }
    }

    
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
        const response = await solana.connect();
        const wallet = response.publicKey.toString()
        console.log('Connected with Public Key:', wallet);
        setWalletAddress(wallet); 
        var user =  users.find((user) => user.userAddress.toString() === response.wallet); 
        if(user != null && wallet != null){ 
            setUser(user);
        }
    }
  };

    const drawNoConnectedButton = () => {
        return (
            <ul className="flex items-center gap-2 mx-4">
                <li>
                    <button onClick={connectWallet} className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200" >
                        Connect to Wallet
                    </button>
                </li>
            </ul>
        )
    }

    const drawConnectedButtons =() => {
        return (
            <ul className="flex items-center gap-2 mx-4">
                {
                    connectedUser.creator &&
                        <li>
                            <Link to={"/"} className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">Dashboard</Link>
                        </li>
                }
                {
                    connectedUser.creator && !isCreator &&   
                        <li>
                            <Link to={"/" + connectedUser.name} className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">View page</Link>
                        </li>
                }
                {
                    connectedUser.creator && !isCreator &&
                        <li>
                            <Link to={"/post/new"} className="px-2 py-2 text-xs bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create Post</Link>
                        </li>
                }
                {
                    !isCreator &&
                    <li>
                        <Link to="/creator/account"> 
                            <div className="p-2 rounded hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current text-gray-800"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                }
                <li>
                    <button onClick={()=>disconnect()}>
                        <div className="p-2 rounded hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current text-gray-800 "
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </button>
                </li>
        </ul>
        )
    }

    return (
      <nav className="p-4 md:py-2 xl:px-0 md:container md:mx-w-6xl md:mx-auto">
        <div className="hidden lg:flex lg:justify-between lg:items-center">
            {
                !isCreator &&
                <a href="/" className="flex px-4 items-start gap-2 group">
                   <img src={solfansLogo} alt="solfans" width={200}></img>  
                </a>
            }
            {   
                isCreator && <div className="flex px-4 items-start gap-2 group"></div>
            }
            {
                (connectedUser && connectedUser.creator) &&
                    drawConnectedButtons()
            }
            {
                (!walletAddress) &&
                    drawNoConnectedButton()
            } 
        </div>
        <div className="lg:hidden relative flex justify-between w-full">
            {
                !isCreator &&
                    <a href="/" className="flex px-4 items-start gap-2 group">
                        <img src={solfansLogo} alt="solfans" width={200}></img>  
                    </a>
            }
            {   
                isCreator && <div className="flex px-4 items-start gap-2 group"></div>
            }
            {
                (connectedUser && connectedUser.creator) &&
                    drawConnectedButtons()
            }
            {

                (!walletAddress) &&
                    drawNoConnectedButton()
            } 
        </div>
      </nav>
    )
  }
