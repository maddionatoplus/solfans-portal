import { Program } from "@project-serum/anchor";
import { baseAccount, getProvider, programID } from "../App";
import idl from '../idl.json'; 
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { MyUtil } from "../utils/my_util";
import { Constants } from "../utils/constants";
import { uploadFile } from '../utils/file_uploader';
import { FilePicker } from 'react-file-picker'
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {useNavigate} from 'react-router-dom';

export default function MyAccount() {
    const navigate = useNavigate();

    const {connectedUser, walletAddress} = useContext(UserContext);
    const [addBioValue, setAddBioValue] = useState('');
    const [monthPriceValue, setMonthPriceValue] = useState('');
    const [coverImageValue, setCoverImageValue] = useState(null);

    
    useEffect(() => { 
        console.log("entro")
        if(!walletAddress || !connectedUser){
            navigate('/', {replace: true})
        }
        console.log("setAddUserValue");
        setAddBioValue(connectedUser.bio);
        setMonthPriceValue(connectedUser.monthPrice / LAMPORTS_PER_SOL);
    }, []);

    const onBioChange = (event) => {
        const { value } = event.target;
        setAddBioValue(value);
      };
    
      const onMonthPriceChange = (event) => {
        const { value } = event.target;
        setMonthPriceValue(value);
      };


    const updateUserInfo = async () => { 
        try {
          const provider = getProvider();
          const program = new Program(idl, programID, provider);

          if(monthPriceValue.length === 0){
            console.log("set month price");
            return;
          }
    
          var url = connectedUser.image;
     
          if (coverImageValue !== null) {
            console.log(coverImageValue);
        
            var randomizeName = MyUtil.randomizeName(coverImageValue.name);
            
            console.log(randomizeName); 
            
            url = await uploadFile(randomizeName, coverImageValue)
          }
         
          await program.rpc.updateUserInfo(url, addBioValue, monthPriceValue * LAMPORTS_PER_SOL, {
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

    return (
        <body className="relative antialiased bg-gray-100">
        
        <div className="p-4 md:pb-4 md:pt-8 container mx-w-6xl mx-auto">
            <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    
                    <div className="container md:col-start-2 col-span-3">
                        <Link to="/creator" className="flex items-start gap-2 group text-indigo-800 hover:text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg> 
                                <p className="text-base font-semibold">Dashboard</p>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
        
    
        
        <main className="container mx-w-6xl mx-auto">
            <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    
                    <div className="container md:col-start-2 col-span-3">
                        
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-semibold">MY ACCOUNT</span>
                            </div>
                            <label className="block">
                                <span className="text-gray-700">Name</span>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" disabled value={connectedUser.name}  />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Bio</span>
                                <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={addBioValue} 
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
                            <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold" onClick={() => updateUserInfo()}>
                                <button href="#" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Save changes</button>
                            </ul> 
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
                                <input type="text" onChange={onMonthPriceChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={monthPriceValue} />
                            </label>
                            <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                                <button href="#" onClick={() => updateUserInfo()} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Save changes</button>
                            </ul> 
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
        </main>
        
    
    </body>
    )
}