import { Program } from "@project-serum/anchor";
import { baseAccount, getProvider, programID } from "../App";
import idl from '../idl.json'; 
import { Link  } from "react-router-dom";
import { useContext, useState, useEffect, useReducer } from "react";
import { UserContext } from "../App";
import { MyUtil } from "../utils/my_util";
import { Constants } from "../utils/constants";
import { uploadFile } from '../utils/file_uploader';
import { FilePicker } from 'react-file-picker'

import {useNavigate} from 'react-router-dom';

export default function MyAccount() {
    const navigate = useNavigate();

    const {connectedUser, walletAddress, users} = useContext(UserContext);
    const [userValue, setUserValue] = useState('');
    const [addBioValue, setAddBioValue] = useState('');
    const [monthPriceValue, setMonthPriceValue] = useState('');
    const [coverImageValue, setCoverImageValue] = useState(null);
    const [becomeCreator, setBecomeCreator] = useState(false);
 
    useEffect(() => {  
        console.log("entro")
        if(!walletAddress){
            navigate('/', {replace: true})
        }
        console.log("setAddUserValue");
        setUserValue(connectedUser != null ? connectedUser.name : "");
        setAddBioValue(connectedUser != null ? connectedUser.bio : "");
        setMonthPriceValue((connectedUser != null ? connectedUser.monthPrice.toNumber() : 1)); 
    }, [connectedUser]);

    const onBioChange = (event) => {
        const { value } = event.target;
        setAddBioValue(value);
    };
    
    const onUserChange = (event) => {
        const { value } = event.target;
        setUserValue(value);
    };

      const onMonthPriceChange = (event) => {
        const { value } = event.target;
        setMonthPriceValue(value);
      };


    const updateUserInfo = async () => { 
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);
            console.log(/^[A-Za-z][A-Za-z0-9_]{3,14}$/.test(userValue))

            if(!validateInput())
                return;

          var url = connectedUser.image;
     
          if (coverImageValue !== null) {
            console.log(coverImageValue);
        
            var randomizeName = MyUtil.randomizeName(coverImageValue.name);
            
            console.log(randomizeName); 
            
            url = await uploadFile(randomizeName, coverImageValue)
          }

          await program.rpc.updateUserInfo(userValue, url, addBioValue, monthPriceValue , {
            accounts: {
              baseAccount: baseAccount.publicKey,
              user: walletAddress,
            },
          });

          navigate('/', {replace: true})

        } catch(error) {
          console.log("Error updatingUserInfo account:", error)
        }
    }

    const validateInput = () => {
        
        if(userValue == null || userValue.length < 3 || !/^[A-Za-z][A-Za-z0-9_]{5,14}$/.test(userValue)){
            alert("fill nickname, you can use letter, numbers and _. You have at least 3 characters and don't start with a number")
            return false;
        }
        
        console.log(walletAddress)
        console.log(userValue.toLowerCase())

        if(users.find((user) => user.name.toLowerCase() === userValue.toLowerCase() && user.userAddress.toString() !== walletAddress)){
            alert("username already taken")
            return false;
        }

        if(isNaN(monthPriceValue) || monthPriceValue < 0){
            alert("input a valid month price")
            return false;
        }
        return true
    }

    const becomeCreatorRequest = async () => { 
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);

            if(!validateInput())
            return;
            
            var url = "";
            if(connectedUser){
                url = connectedUser.image;

            }
     
            if (coverImageValue !== null) {
                console.log(coverImageValue);
            
                var randomizeName = MyUtil.randomizeName(coverImageValue.name);
                
                console.log(randomizeName); 
                
                url = await uploadFile(randomizeName, coverImageValue)
            }
            
            await program.rpc.becomeCreator(userValue, url, addBioValue, monthPriceValue, {
                accounts: {
                baseAccount: baseAccount.publicKey,
                user: walletAddress,
                },
            });

            navigate('/', {replace: true})

        } catch(error) {
          console.log("Error updatingUserInfo account:", error)
        }
    }
    
    const onCoverImageChange = (value) => {
        console.log(value);
        if(value != null && MyUtil.isExtensionValid(value.name, Constants.coverImageValidExtensions)){
            setCoverImageValue(value);
        } 
    };

    const becomeCreatorClick = () => {
        console.log("become")
        setBecomeCreator(true)
    }

    const renderBecomeCreatorButton = () => {
        return (
            <div>
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        
                        <div className="container md:col-start-2 col-span-3">
                            
                            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-semibold">MY ACCOUNT</span>
                                </div>
                                <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold" onClick={() => becomeCreatorClick()}>
                                    <button href="#" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Become a creator</button>
                                </ul> 
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
    
    const renderProfileForm = () => { 
        const isCreator = connectedUser && connectedUser.creator;

        if(!isCreator && !becomeCreator)
            return renderBecomeCreatorButton()

        return (
            <div>
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        
                        <div className="container md:col-start-2 col-span-3">
                            
                            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-semibold">MY ACCOUNT</span>
                                </div>
                                { !isCreator && <p>Fill in your info to become a creator:</p>}
                                <label className="block">
                                    <span className="text-gray-700">Name</span>
                                    <input type="text" onChange={onUserChange}  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={userValue}  />
                                </label>
                                <label className="block">
                                    <span className="text-gray-700">Bio</span>
                                    <input type="text" className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={addBioValue} 
                                        onChange={onBioChange} />
                                </label>
                                <input
                                    type = "text"
                                    placeholder='Pick cover image'
                                    value={coverImageValue != null ? coverImageValue.name : ""}
                                    disabled={true}
                                    /> 
                                <FilePicker
                                    extensions={Constants.coverImageValidExtensions}
                                    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                    onChange={base64 => onCoverImageChange(base64)}
                                    maxSize={10}
                                    onError={(error) => alert("Accepted only: " + Constants.coverImageValidExtensions.join(","))}
                                    >
                                    <button className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">
                                    Pick image
                                    </button>
                                </FilePicker>
                                {
                                isCreator && 
                                    <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold" onClick={() => updateUserInfo()}>
                                        <button href="#" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Save changes</button>
                                    </ul> 
                                }
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        
                        <div className="container md:col-start-2 col-span-3">
                            
                            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 font-semibold">MY SUBSCRIPTION PLAN</span>
                                </div>
                                <label className="block">
                                    <span className="text-gray-700">Price (in SOL)</span>
                                    <input type="text" onChange={onMonthPriceChange} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={monthPriceValue} />
                                </label>
                                {
                                    isCreator && 
                                        <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                                            <button href="#" onClick={() => updateUserInfo()} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Save changes</button>
                                        </ul> 
                                }
                                {
                                    !isCreator && 
                                        <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                                            <button href="#" onClick={() => becomeCreatorRequest()} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Become a creator</button>
                                        </ul> 
                                }
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }
    
  const renderSubscriptions = () => { 
    return (

        <div className="col-span-1 bg-white rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                                     
          {
            connectedUser &&  
            connectedUser.subscriptions.map((subscription, index) => {
                var creator = users.find((user) => user.userAddress.toString() === subscription.userAddress);
                const subscriptionEndString = MyUtil.timeConverter(subscription.subscriptionEnd.toNumber());

                if(MyUtil.isSubscriptionValid(subscription)) 
                    return (
                        <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                            <p className="text-gray-800">{creator.name}<br/><span className="text-sm text-gray-600" style={{fontWeight: 400}}>Subscribtion is valid until: {subscriptionEndString}</span></p>
                            <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                                <a href="edit-post.html" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                                <a href="#" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </a>
                            </p>
                        </li>
                    ) 
                })
          }
          </ul>
      </div> 
      )
  }
    return (
        <body className="relative antialiased bg-gray-100">
        
        <div className="p-4 md:pb-4 md:pt-8 container mx-w-6xl mx-auto">
            <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    
                    <div className="container md:col-start-2 col-span-3">
                        <Link to="/creator/home" className="flex items-start gap-2 group text-indigo-800 hover:text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg> 
                                <p className="text-base font-semibold">Dashboard</p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
        
        {
            renderProfileForm()
        }
        
        <main className="container mx-w-6xl mx-auto">
            
            <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    
                    <div className="container md:col-start-2 col-span-3">
                        
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-semibold">MY SUBSCRIPTIONS</span>
                            </div>
                            
                            {renderSubscriptions()}
                            
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </main>
        
    
    </body>
    )
}