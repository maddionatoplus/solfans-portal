import { Link } from "react-router-dom";


export default function EditPost() {
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
                            <span className="text-xs text-gray-500 font-semibold">EDIT POST</span>
                        </div>
                        <label className="block">
                            <span className="text-gray-700">Post title</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="post title" />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Post body</span>
                            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={3} ></textarea>
                        </label>
                        <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                            <Link to="/creator/home" className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">Cancel</Link>
                            <a href="#" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Save changes</a>
                        </ul> 
                    </div> 
                </div> 
            </div> 
        </div>
    </main> 

</body>
    )
}