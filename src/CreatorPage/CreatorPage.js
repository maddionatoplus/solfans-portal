/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState, } from "react";
import solfansLogo from "../assets/solfans_logo.png" 
import { UserContext } from "../App";
import {useNavigate} from 'react-router-dom';
import { MyUtil } from "../utils/my_util";
import { Program, web3 } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import { baseAccount, getProvider, programID } from "../App";
import idl from '../idl.json';    
import Menu from "../Widgets/Menu";
import Content from "../Widgets/Content";

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

export default function CreatorPage() {
  const navigate = useNavigate();
  const { creator } = useParams();
  const {connectedUser, setUser, setCreators, setSolanaPrice, setWalletAddress, walletAddress} = useContext(UserContext);
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
                const wallet = response.publicKey.toString();
                console.log('Connected with Public Key:', wallet);

                setWalletAddress(wallet);
                return wallet;
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
        const wallet = await checkIfWalletIsConnected()
        try{
            console.log("on load")
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
            var user = account.users.find((user) => user.userAddress.toString() === wallet);
            console.log("faccio get users")
            console.log(account.users)
            if(user != null && wallet != null){ 
                setUser(user);
            }
            
            let creators = (account.users.filter((user) => user.creator));
            setCreators(creators);
            var selectedCreator = creators.find((user) => user.name.toLowerCase() === creator.toLowerCase());
            console.log(creator)
            console.log(selectedCreator)
            console.log(creators)
            if(selectedCreator != null){
                console.log(wallet)
                if(wallet != null){
                    console.log("itsme")
                    console.log(selectedCreator.userAddress.toString() === wallet)
                    setItsMe(selectedCreator.userAddress.toString() === wallet)
                }
                setSelectedCreator(selectedCreator)
                var subscription = user.subscriptions.find(s => s.userAddress.toString() === selectedCreator.userAddress.toString());
                console.log("subscription find", subscription)
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
  }, [creator]);

  const renderLoading = () => {
    return <div className="w-full h-full">LOADING</div>
  }

  const renderNotSubscribed = () => {
      console.log("renderNoContent")
      if(itsme){
        console.log("itsme")
        console.log(connectedUser)
        if(connectedUser.contents.length > 0){
            console.log("ciao")
            return (
                connectedUser.contents.map((item, index) => {  
                    return (
                        <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <h2 className="px-4 text-2xl font-bold">{item.title}</h2>
                                {
                                    Content(item)
                                } 
                                <span
                                    className="px-4 text-sm text-gray-600"
                                    style={{ fontWeight: 400 }}
                                >
                                    {MyUtil.timeConverter(item.date.toNumber())}
                                </span>
                                <p className="px-4 text-sm text-gray-600">{item.description}</p>
                            </div>               
                            <Link to="/post" state={{post:item, creator: selectedCreator}}> 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </Link> 
                        </li>
                    )
                })
            )
        }
        else {
            return (
                <div className="content-around">
                    <Link to="/post/new" className="px-4 py-2 m-10 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">Publish your first content!</Link>
                </div>
            )
        }
    }

    if(selectedSubscription == null){
        return (
            <div className="content-around">
                <p>Subscribe to see {selectedCreator.name} contents</p>
            </div>
        )
    }
    
    return (
        <p>Wait for {selectedCreator.name} first content!</p>
    )
  }

  const renderPostList = () => {
    console.log(selectedSubscription)
    return (
        <div className="container col-span-3">
            <div className="col-span-3 bg-white p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
            {
                selectedSubscription != null && selectedCreator.contents.length > 0 ?
                    selectedCreator.contents.map((item, index) => {  
                        return (
                                <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                                    <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                        <h2 className="px-4 text-2xl font-bold">{item.title}</h2>
                                        {
                                            Content(item)
                                        } 
                                        <span
                                            className="px-4 text-sm text-gray-600"
                                            style={{ fontWeight: 400 }}
                                        >
                                            {MyUtil.timeConverter(item.date.toNumber())}
                                        </span>
                                        <p className="px-4 text-sm text-gray-600">{item.description}</p>
                                    </div>               
                                    <Link to="/post" state={{post:item}}> 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </Link> 
                                </li>               
                        )
                    })
                :
                renderNotSubscribed()
            }
            </div>
        </div>
    )
  }

  const subscribe = async (creator) => {
    console.log("SUBSCRIBE")
    try {
      alert("Attention you should accept 2 transactions:\n1- to send money directly to the creator\n2- to confirm your subscription to Solfans")
      const provider = getProvider();
      const program = new Program(idl, programID, provider);

      console.log(provider.wallet.publicKey)
      console.log(creator.userAddress)

      const price = MyUtil.convertPriceInSol(creator.monthPrice.toNumber()) * LAMPORTS_PER_SOL;

      let transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: provider.wallet.publicKey,
          toPubkey: new PublicKey(creator.userAddress),
          lamports: price
        })
      );
    
      var result = await provider.send(transaction);
    
      console.log('Transaction result', result);
     
      await program.rpc.addSubscription({
        accounts: {
          baseAccount: baseAccount.publicKey,
          subscriber: provider.wallet.publicKey,
          creator: creator.userAddress
        },
      });
      console.log("Successful subscribed")
      window.location.reload();


    } catch (error) {
      console.log("Error while subscribing:", error)
    }
  }

  const unsubscribe = async (creator) => {

    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
     
      await program.rpc.removeSubscription({
        accounts: {
          baseAccount: baseAccount.publicKey,
          subscriber: provider.wallet.publicKey,
          creator: creator.userAddress
        },
      });
      console.log("Successful unsubscribed")
      window.location.reload();
    } catch (error) {
      console.log("Error while subscribing:", error)
    }
  }


  const renderSubscriptionArea = () => {
        console.log("walletAddress", walletAddress)
        console.log("itsme", itsme)
        console.log("selectedSubscription", selectedSubscription)

        var subscriptionEndString;
        var subscriptionValid = false;

        if(selectedSubscription){
            subscriptionEndString = MyUtil.timeConverter(selectedSubscription.subscriptionEnd.toNumber());
            subscriptionValid = MyUtil.isSubscriptionValid(selectedSubscription)
        }

        if(!walletAddress)
            return(
                <div className="container col-span-1">
                    <div className="col-span-1 bg-white p-6 mx-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                        <div className="grid">
                            <span className="text-xs text-gray-500 font-semibold mb-2 uppercase">Support {selectedCreator.name}</span>
                            <span className="text-sm text-gray-800 font-regular mb-4">Connect your wallet to subscribe and see the creator contents.</span>
                        </div>
                    </div>
                </div>  
            )
        
        if(itsme)
            return(
                <div className="container col-span-1">
                    <div className="col-span-1 bg-white p-6 mx-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                        <div className="grid">
                            <span className="text-xs text-gray-500 font-semibold mb-2 uppercase">Support {selectedCreator.name}</span>
                            <span className="text-sm text-gray-800 font-regular mb-4">Your subscription cost is {MyUtil.convertPriceInSol(selectedCreator.monthPrice.toNumber())} SOL.</span>
                            <Link to={"/creator/account"} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">Click to modify</Link>
                        </div>
                    </div>
                </div>  
            )
        
        if(selectedSubscription){
            const subscriptionText = subscriptionValid ? "Your subscription is valid until: " + subscriptionEndString 
                                                        : "Your subscription is expired on: " + subscriptionEndString;

            return(
                <div className="container col-span-1">
                    <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                        <div className="grid">
                            <span className="text-xs text-gray-500 font-semibold mb-2 uppercase">You are {!subscriptionValid ? "no more" : ""} subscribed to {selectedCreator.name}</span>
                            <span className="text-sm text-gray-800 font-regular mb-4">{subscriptionText}</span>
                            {!subscriptionValid && <span className="text-sm text-gray-800 font-regular mb-4">Subscribe now and get 30 days access to all content from this creator</span>} 
                            <a href="#"  onClick={() => subscriptionValid ? unsubscribe(selectedCreator) : subscribe(selectedCreator)} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">{subscriptionValid?"UNSUBSCRIBE":"SUBSCRIBE - " + MyUtil.convertPriceInSol(selectedCreator.monthPrice.toNumber()) + " SOL"} </a>
                        </div>
                    </div>
                </div>  
            )
        }
        

        return(
            <div className="container col-span-1">
                <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                    <div className="grid">
                        <span className="text-xs text-gray-500 font-semibold mb-2 uppercase">Support {selectedCreator.name}</span>
                        <span className="text-sm text-gray-800 font-regular mb-4">Subscribe now and get 30 days access to all content from this creator.</span>
                            <a href="#"  onClick={() => subscribe(selectedCreator)} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">{subscriptionValid?"UNSUBSCRIBE":"SUBSCRIBE - " + MyUtil.convertPriceInSol(selectedCreator.monthPrice.toNumber()) + " SOL"} </a>
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
                        <img src={selectedCreator.image} className="h-32 w-32 bg-gray-500 border-none rounded-full" />
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
                        { renderSubscriptionArea() }
                    </div> 
                </div>
            </main>
        </div>
      );
  }
 
  return(
    <body className="relative antialiased bg-gray-100"> 
        {Menu(connectedUser)}
        {selectedCreator == null && renderLoading()}
        {selectedCreator != null && renderCreatorPage()}
        <div>
            <div className="w-full flex flex-col items-center mb-4 mt-6">
                <div className="mb-3">
                    <p className="px-4 text-sm font-semibold text-center text-gray-600">Powered by</p>
                </div>
                <div>
                    <a href="https://solfans.xyz/" target="_blank" rel="noreferrer"><img src={solfansLogo} alt="solfans" className="h-16 w-32 bg-gray-200 border-none" /></a>
                </div>
            </div>
        </div> 
    </body>
      )  
}
