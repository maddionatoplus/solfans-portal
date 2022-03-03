import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { MyUtil } from "../utils/my_util";
import { Constants } from "../utils/constants";
import { uploadFile } from '../utils/file_uploader';
import { getProvider } from "../App";
import { Program } from "@project-serum/anchor";
import idl from "../idl.json";
import { programID, baseAccount } from "../App";
import { FilePicker } from 'react-file-picker';
import {useNavigate} from 'react-router-dom';

export default function NewPost() {
    const navigate = useNavigate();
    
    const {walletAddress} = useContext(UserContext);

    const [contentFileValue, setContentFileValue] = useState(null);
    const [titleDescriptionValue, setTitleDescriptionValue] = useState('')
    const [contentDescriptionValue, setContentDescriptionValue] = useState('')
    
    
    useEffect(() => {
        const onLoad = async () => {
            console.log("walletAddres", walletAddress)
            if(!walletAddress){
                navigate('/', {replace: true})
            }
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);
        
    const addContent = async () => {
        if ( titleDescriptionValue === null || contentDescriptionValue.length === 0) {
            console.log("Complete link and description!")
            return
        }

        
        var url = ""
        
        if(contentFileValue){
            console.log(contentFileValue);
    
            var randomizeName = MyUtil.randomizeName(contentFileValue.name);
            
            console.log(randomizeName); 

            await uploadFile(randomizeName, contentFileValue)
            
            console.log('Content link:', url);
            console.log('Content description:', contentDescriptionValue);
        }
        try {
            const provider = getProvider();
            console.log(provider);
            const program = new Program(idl, programID, provider);
            
            console.log(baseAccount.publicKey)
            console.log(walletAddress)
            console.log(url)

            await program.rpc.addContent(
                url, 
                titleDescriptionValue,
                contentDescriptionValue, {
                accounts: {
                    baseAccount: baseAccount.publicKey,
                    user: walletAddress,
                },
            });
            console.log("Content successfully uploaded", contentFileValue)
            setContentFileValue('');
            setTitleDescriptionValue('');
            setContentDescriptionValue('');
            navigate('/', {replace: true})

        } catch (error) {
            console.log("Error uploading content:", error)
        }
    };  
  
    const onTitleDescriptionChange = (event) => {
        const { value } = event.target;
        setTitleDescriptionValue(value);
    };
  
    const onContentDescriptionChange = (event) => {
        const { value } = event.target;
        setContentDescriptionValue(value);
    };

    const onContentFileChange = (value) => {
        console.log(value);
        if(value != null && MyUtil.isExtensionValid(value.name, Constants.contentValidExtensions)){
        setContentFileValue(value);
        } 
    };




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
    

    
    <main className="container mx-w-6xl mx-auto">
        <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                
                <div className="container md:col-start-2 col-span-3">
                    
                    <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-semibold">CREATE NEW POST</span>
                        </div>
                        <label className="block">
                            <span className="text-gray-700">Post title</span>
                            <input type="text" 
                                value={titleDescriptionValue}
                                onChange={onTitleDescriptionChange} 
                                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="post title" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Post body</span>
                            <textarea 
                                value={contentDescriptionValue}
                                onChange={onContentDescriptionChange} 
                                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={3} ></textarea>
                        </label>
                        <FilePicker
                            extensions={Constants.contentValidExtensions}
                            dims={{minWidth: 100, maxWidth: 100, minHeight: 100, maxHeight: 500}}
                            onChange={base64 => onContentFileChange(base64)}
                            maxSize={10}
                            onError={(error) => alert("Accepted only: " + error)}
                        >
                            <button  className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">
                            Pick File
                            </button>
                        </FilePicker>
                        <input type="text" disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={contentFileValue ? contentFileValue.name : ""} />
                        <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                            <Link to="/creator/home" className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">Cancel</Link>
                            <a href="#" onClick={() => addContent()} className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Publish post</a>
                        </ul> 
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    </main>
    

</body>
    )
}