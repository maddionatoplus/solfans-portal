
import { useEffect, useContext } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'; 
import Menu from './../Widgets/Menu'
import { UserContext } from '../App';
import Content from '../Widgets/Content';

export default function PostPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state;
    const {connectedUser} = useContext(UserContext);

    useEffect(() => {
        const onLoad = async () => {
            try{
                console.log("entro") 
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
        <body class="relative antialiased bg-gray-100">
            {Menu(connectedUser)}  
            <div class="p-4 md:pb-4 md:pt-8 container mx-w-6xl mx-auto">
                <div class="flex flex-col space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        <div class="container md:col-start-2 col-span-3">
                            <a href="/" class="flex items-start gap-2 group text-indigo-800 hover:text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg> 
                                <p class="text-base font-semibold">home</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <main class="container mx-w-6xl mx-auto">
                <div class="flex flex-col space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                        <div class="container md:col-start-2 col-span-3">
                            <div class="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                                {
                                    Content(post)
                                }
                                <h2 class="px-4 text-2xl font-bold">{post.title}</h2>
                                <p class="px-4 text-sm text-gray-600">{post.description}</p>
                            </div>
                        </div>
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