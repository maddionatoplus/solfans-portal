/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import solfansLogo from "../assets/solfans_logo.png" 
import { UserContext } from "../App";
import {useNavigate} from 'react-router-dom';
import { MyUtil } from "../utils/my_util";
import { Program } from "@project-serum/anchor";
import { baseAccount, getProvider, programID } from "../App";
import idl from '../idl.json';    

export default function CreatorPage() {
  const navigate = useNavigate();
  let { creator } = useParams();
  const {connectedUser, setCreators, setSolanaPrice, setWalletAddress, walletAddress} = useContext(UserContext);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [itsme, setItsMe] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
        const solana  = window.solana;

        if (solana) {
          if (solana.isPhantom) {
              console.log('Phantom wallet found!');

              var solanaPrice = await MyUtil.getSolanaPrice();
              console.log(solanaPrice)
              setSolanaPrice(solanaPrice.usd);
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
        await checkIfWalletIsConnected()
        try{
            console.log("on load")
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            console.log("faccio get users")
            
            let creators = (account.users.filter((user) => user.creator));
            setCreators(creators);
            var selectedCreator = creators.find((user) => user.name === creator);
            if(selectedCreator != null){
                console.log("itsme")
                console.log(walletAddress)
                if(walletAddress != null){
                    console.log(selectedCreator.userAddress.toString() === walletAddress)
                    setItsMe(selectedCreator.userAddress.toString() === walletAddress)
                }
                setSelectedCreator(selectedCreator)
                var subscription = selectedCreator.subscriptions.find(s => s.userAddress.toString() === selectedCreator.userAddress.toString());
                setSelectedSubscription(subscription)
            }
            else{
                console.log("user not found");
                navigate('/', {replace: true})
            } 
        }
        catch(ex){
            console.log("error", ex);
            navigate('/', {replace: true})
        }
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const renderLoading = () => {
    return <div className="w-full h-full">LOADING</div>
  }

  const renderPostList = () => {

    return (
        <div className="container col-span-3">
            {
                selectedCreator.contents.length > 0 ?
                    selectedCreator.contents.map((item, index) => {  
                        return (
                            <Link to={selectedSubscription != null ? '/post' : '#'} className={selectedSubscription != null ? "disabled-link" : ""} state={{post: item}} key={index}>
                                <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                    <h2 className="px-4 text-2xl font-bold">{item.title}</h2>
                                    <p className="px-4 text-sm text-gray-600">{item.description}</p>
                                </div>
                            </Link>
                        )
                    })
                :
                <p>Wait for {selectedCreator.name} first content!</p>
            }
        </div>
    )
  }

  const renderSubscriptionArea = () => {
      return(
            <div className="container col-span-1">
                <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                    <div className="grid">
                        <span className="text-xs text-gray-500 font-semibold mb-2 uppercase">Support {selectedCreator.name}</span>
                        <span className="text-sm text-gray-800 font-regular mb-4">Subscribe now and get 1 month access to all content from this creator.</span>
                        <a href="#" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">SUBSCRIBE - {selectedCreator.monthPrice.toNumber()} SOL</a>
                    </div>
                </div>
            </div>
          ) 
  }

  const renderCreatorPage = () => {
    return (
        <div>
            <main className="w-screen">
                <div className="mb-6 pt-20 pb-6 pr-6 pl-6">
                    <div className="w-full flex flex-col items-center mb-6">
                        <img className="h-32 w-32 bg-gray-500 border-none rounded-full" />
                        </div>
                        <div>
                            <h1 className="px-4 text-3xl font-bold text-center text-gray-800">{selectedCreator.name}</h1>
                            <h2 className="px-4 text-base text-gray-600 font-regular text-center">{selectedCreator.bio}</h2>
                    </div>
                </div>
            </main> 
            <main className="container mx-w-6xl mx-auto py-4">
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 items-start px-4 xl:p-0 gap-y-4 md:gap-6"> 
                        { renderPostList() } 
                        { itsme === false ? renderSubscriptionArea() : <div></div>}
                    </div> 
                </div>
            </main>
        </div>
      );
  }
 
  return(
    <body className="relative antialiased bg-gray-100"> 
        {selectedCreator == null && renderLoading()}
        {selectedCreator != null && renderCreatorPage()}
        <div>
            <div className="w-full flex flex-col items-center mb-8 mt-6">
                <div className="mb-3">
                    <p className="px-4 text-sm font-semibold text-center text-gray-600">Powered by</p>
                </div>
                <div>
                    <a href="https://solfans.xyz/" target="_blank" rel="noreferrer"><img src={solfansLogo} className="h-16 w-32 bg-gray-200 border-none" /></a>
                </div>
            </div>
        </div> 
    </body>
      )  
}
