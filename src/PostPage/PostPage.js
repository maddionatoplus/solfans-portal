
import { useEffect, useContext } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'; 
import Menu from './../Widgets/Menu'
import { UserContext } from '../App';
import Content from '../Widgets/Content';
import solfansLogo from "../assets/solfans_logo.png" 

export default function PostPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const { post, creator } = location.state; 

    useEffect(() => {
        const onLoad = async () => {
            try{ 
                console.log(post) 
            }
            catch(ex){
                console.log("error", ex);
                navigate('/', {replace: true})
            }
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
      }, []);
 
    const renderPostPage = () => {
        return (
        <body className="relative antialiased bg-gray-100">
            {/*Menu(connectedUser, false)*/}  
            <div className="p-4 md:pb-4 md:pt-8 container mx-w-6xl mx-auto">
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        <div className="container md:col-start-2 col-span-3">
                            <a href={"/"+ creator.name ?? ""} className="flex items-start gap-2 group text-indigo-800 hover:text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg> 
                                <p className="text-base font-semibold">back</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <main className="container mx-w-6xl mx-auto">
                <div className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        <div className="container md:col-start-2 col-span-3">
                            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                <h2 className="px-4 text-2xl font-bold">{post.title}</h2>
                                {
                                    Content(post)
                                }
                                <p className="px-4 text-sm text-gray-600">{post.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center mb-4 mt-6">
                    <div className="mb-3">
                        <p className="px-4 text-sm font-semibold text-center text-gray-600">Powered by</p>
                    </div>
                    <div>
                        <a href="https://solfans.xyz/" target="_blank" rel="noreferrer"><img src={solfansLogo} alt="solfans" className="h-16 w-32 bg-gray-200 border-none" /></a>
                    </div>
                </div>
            </main>
        </body>
        )
    }  

    return (
        <div>
            {
                post && renderPostPage()
            }
            {
                post === undefined && <p>loading</p>
            }
        </div>
    )
}