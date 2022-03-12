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
import ReactLoading from 'react-loading';

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram } = web3;

export default function CreatorPage() {
  const navigate = useNavigate();
  const { creator } = useParams();
  const {connectedUser, walletAddress, creators } = useContext(UserContext);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [itsme, setItsMe] = useState(false);
  
  useEffect(() => {
    console.log("on load") 
    var selectedCreator = creators.find((user) => user.name.toLowerCase() === creator.toLowerCase());
    console.log(creator) 
    console.log(creators)
    if(selectedCreator != null){
        console.log(walletAddress)
        if(walletAddress != null){
            console.log("itsme")
            console.log(selectedCreator.userAddress.toString() === walletAddress)
            setItsMe(selectedCreator.userAddress.toString() === walletAddress)
            var subscription = connectedUser.subscriptions.find(s => s.userAddress.toString() === selectedCreator.userAddress.toString());
            console.log("subscription find", subscription)
            setSelectedSubscription(subscription)
        }

        setSelectedCreator(selectedCreator)
    }
    else{
        if(creators.length !== 0)
            navigate('/', {replace: true})
    }   
  }, [walletAddress, creators]);

  const renderLoading = () => {
      return <div style={{minHeight:"70vh", textAlign:"center", position:"relative"}}>
                <span style={{position:"absolute", left:"50%", top:"50%", marginLeft:"-25px", marginTop:"-25px"}}><ReactLoading type={"spin"} color={"grey"} height={'50px'} width={'50px'} /></span>
            </div>
  }

  const renderNotSubscribed = () => {
      console.log("renderNoContent")
      if(itsme){
        console.log("itsme")
        console.log(connectedUser)
        if(connectedUser.contents.length > 0){
            return (
                connectedUser.contents.slice(0).reverse().map((item, index) => {  
                    return (
                        <div className="relative pb-6 flex justify-between text-base text-gray-500 font-semibold bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                            <div className="col-span-1 p-6 rounded-xlborder  border-gray-50 flex flex-col space-y-6 mb-6">
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                {
                                    Content(item)
                                } 
                                <span
                                    className="text-sm text-gray-600"
                                    style={{ fontWeight: 400 }}
                                >
                                    {MyUtil.timeConverter(item.date.toNumber())}
                                </span>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>               
                            <Link className="absolute right-3.5 top-0" to="/post/view" state={{post:item, creator: selectedCreator}}> 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>    
                            </Link> 
                        </div>
                    )
                })
            )
        }
        else {
            return (
                <div className="bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                    <div className="content-around" style={{padding: "50px 0px"}}>
                        <Link to="/post/new" className="px-4 py-2 m-10 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create your first post</Link>
                    </div>
                </div>
            )
        }
    }

    if(selectedSubscription == null){
        return (
            <>
            <div className="bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                <p className="text-2xl text-gray-500 font-semibold">Subscribe to see {selectedCreator.name} contents</p>
            </div>
            {renderPostList(false) }
            </>
        )
    }
    
    return (
        <div className="bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
            <p className="text-2xl text-gray-500 font-semibold">Wait for {selectedCreator.name} first content!</p>
        </div>
    )
  }

  const renderPostList = (subscribed) => {
    console.log(selectedSubscription)
    return ( 
            selectedCreator.contents.slice(0).reverse().map((item, index) => {  
                return (
                    <div className="relative pb-6 flex justify-between text-base text-gray-500 font-semibold bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                        <div className="col-span-1 p-6 rounded-xlborder  border-gray-50 flex flex-col space-y-6 mb-6">
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                                {
                                    subscribed && Content(item)
                                } 
                                {
                                    subscribed &&
                                    <span
                                        className="text-sm text-gray-600"
                                        style={{ fontWeight: 400 }}
                                    >
                                        {MyUtil.timeConverter(item.date.toNumber())}
                                    </span>
                                }
                                {
                                    subscribed &&
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                }
                            </div>     
                            {
                                subscribed &&
                                <Link className="absolute right-3.5 top-0" to="/post" state={{post:item, creator: selectedCreator}}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path strokeLinecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>    
                                </Link> 
                            }          
                        </div>               
                )
            }) 
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
            <main className="w-screen h-80 bg-indigo-600" style={{backgroundImage:'url(' + selectedCreator.cover + ')', backgroundSize:"cover", backgroundPosition:"center"}}>
                <div class="py-20 px-6">
                    <div class="absolute top-5 right-10">
                        <ul class="flex items-center gap-2">
                            
                        </ul>
                    </div>
                </div>
            </main> 
            <main>
                {/* <img src={selectedCreator.image} className="" /> */}
                <div class="mb-6" style={{marginTop:"-50px"}}> 
                    <div class="w-full flex flex-col items-center mb-6">
                        <div class="h-32 w-32 bg-zinc-400 rounded-full bg-white">
                            {selectedCreator.image ? <img src={selectedCreator.image} className="h-32 w-32 bg-gray-500 border-none rounded-full" alt="" /> :<></>}
                        </div> 
                        <div className="pb-2.5 pl-2.5 pr-2.5" style={{display: "inline-block"}}>
                            <h1 className="text-3xl font-bold text-center text-gray-800">{selectedCreator.name}</h1>
                            <h2 className="text-base text-gray-600 font-regular text-center">{selectedCreator.bio}</h2>
                        </div>  
                    </div> 
                </div>
            </main>
            <main className="container mx-w-6xl mx-auto py-4" style={{maxWidth: "1000px"}}>
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-start px-4 xl:p-0 gap-y-4 md:gap-6"> 
                        <div className="container col-span-2">
                            {
                                selectedSubscription != null && selectedCreator.contents.length > 0 ? 
                                    renderPostList(true) :
                                    renderNotSubscribed()
                            }
                        </div>
                        { renderSubscriptionArea() }
                    </div> 
                </div>
            </main>
        </div>
      );
  }
 
  return(
    <body className="relative antialiased bg-gray-100"> 
        {Menu(connectedUser, true)}
        {selectedCreator == null && renderLoading()}
        {selectedCreator != null && renderCreatorPage()}
        <div>
            <div className="w-full flex flex-col items-center mb-4 mt-6">
                <div className="mb-3">
                    <p className="px-4 text-sm font-semibold text-center text-gray-600">Powered by</p>
                </div>
                <div>
                    <a href="https://solfans.xyz/" target="_blank" rel="noreferrer"><img src={solfansLogo} alt="solfans" className="h-16 w-32 border-none" /></a>
                </div>
            </div>
        </div> 
    </body>
      )  
}
