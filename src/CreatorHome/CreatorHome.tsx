/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import solfansLogo from "../assets/solfans_logo.png"

export default function CreatorHome() {
  
  return (
    <body className="relative antialiased bg-gray-100">
      <nav className="p-4 md:py-8 xl:px-0 md:container md:mx-w-6xl md:mx-auto">
        <div className="hidden lg:flex lg:justify-between lg:items-center">
          
            <a href="index.html" className="flex px-4 items-start gap-2 group">
              <img src={solfansLogo} alt="solfans" width={200}></img>  
            </a>
            <ul className="flex items-center gap-2">
              <Link to="/new"><a href="#" className="px-2 py-2 text-xs bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create New post</a></Link>
                <a href="#" className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">View my page</a>
                <li>
                  <Link to="/account">
                    <a href="my-account.html">
                        <div className="p-2 rounded hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current text-gray-800"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </a></Link>
                </li>
                <li>
                    <a href="#">
                        <div className="p-2 rounded hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current text-gray-800"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div x-data="{ open: false }" className="lg:hidden relative flex justify-between w-full">
            <a href="index.html" className="flex items-start gap-1 group">
              <img src={solfansLogo} alt="solfans" width={200}></img>  
            </a>
            <ul className="flex items-center gap-1">
              <Link to="/new"><a href="#" className="px-2 py-2 text-xs bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create New post</a></Link>
                <a href="#" className="px-2 py-2 text-xs bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200">View my page</a>
                <li>
                  <Link to="/account">
                    <a href="my-account.html">
                        <div className="p-2 rounded hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current text-gray-800"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </a>
                  </Link>
                </li>
                <li>
                    <a href="#">
                        <div className="p-2 rounded hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-current text-gray-800"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
      <main className="container mx-w-6xl mx-auto py-4">
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
            <div className="container col-span-4">
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold">
                    RECENT POSTS
                  </span>
                </div>
                <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                  <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">
                      Post title
                      <br />
                      <span
                        className="text-sm text-gray-600"
                        style={{ fontWeight: 400 }}
                      >
                        Feb 11, 2022 at 11:54 PM
                      </span>
                    </p>
                    <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                      
                    <Link to="/edit">
                      <a
                        href="edit-post.html"
                        className="mr-2 hover:text-indigo-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </a></Link>
                      <Link to="/edit">
                      <a href="#" className="mr-2 hover:text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </a>
                      </Link>
                    </p>
                  </li>
                  <li className="py-6 flex justify-between text-base text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">
                      Post title
                      <br />
                      <span
                        className="text-sm text-gray-600"
                        style={{ fontWeight: 400 }}
                      >
                        Feb 11, 2022 at 11:54 PM
                      </span>
                    </p>
                    <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                      <a
                        href="edit-post.html"
                        className="mr-2 hover:text-indigo-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          {" "}
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </a>
                      <a href="#" className="mr-2 hover:text-indigo-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    CONTRIBUTORS
                  </span>
                </div>
                <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                  <li className="pb-3 flex justify-between text-sm text-gray-500 font-semibold">
                    <p className="px-4 font-semibold">Wallet ID</p>
                    <p className="px-4 font-semibold">Subscribed since</p>
                  </li>
                  <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">apodsifhla</p>
                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                  </li>
                  <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">apodsifhla</p>
                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                  </li>
                  <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">apodsifhla</p>
                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                  </li>
                  <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">apodsifhla</p>
                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container col-span-1">
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                <div className="grid">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    TOTAL EARNINGS
                  </span>
                  <h2 className="font-bold text-4xl mb-1">2,85 SOL</h2>
                  <span className="text-xs text-gray-500 font-regular">
                    145 USD
                  </span>
                </div>
              </div>
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                <div className="grid">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    TOTAL SUPPORTERS
                  </span>
                  <h2 className="font-bold text-4xl mb-1">145</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
  /*
    <body className="relative antialiased bg-gray-100"> 
        <nav className="p-4 md:py-8 xl:px-0 md:container md:mx-w-6xl md:mx-auto"> 
            <div className="hidden lg:flex lg:justify-between lg:items-center">
                <a href="index.html" className="flex items-start gap-2 group">
                    <p className="text-sm font-bold uppercase">Solfan logo</p>
                </a>
                
                <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                    <a href="new-post.html" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create New post</a>
                    <li className="relative" x-data="{ open: false }">
                        <a x-on:click="open = !open" x-on:click.outside="open = false" href="#" className="text-gray-600 rounded-md flex gap-2 items-center hover:text-indigo-500">
                            <div className="p-2 rounded hover:bg-indigo-100 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-current text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5.121 17.804C7.21942 16.6179 9.58958 15.9963 12 16C14.5 16 16.847 16.655 18.879 17.804H5.121ZM15 10C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7956 13 12 13C11.2044 13 10.4413 12.6839 9.87868 12.1213C9.31607 11.5587 9 10.7956 9 10C9 9.20435 9.31607 8.44129 9.87868 7.87868C10.4413 7.31607 11.2044 7 12 7C12.7956 7 13.5587 7.31607 14.1213 7.87868C14.6839 8.44129 15 9.20435 15 10V10ZM21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <ul x-cloak x-show="open" x-transition className="absolute top-10 right-0 bg-white p-4 rounded-md shadow overflow-hidden w-48 cursor-pointer">
                            <li>
                                <a href="#" className="p-2 block text-sm text-gray-800 rounded flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-500">View my page</a>
                            </li>
                            <li>
                                <a href="my-account.html" className="p-2 block text-sm text-gray-800 rounded flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-500">My account</a>
                            </li>
                            <li>
                                <a href="#" className="p-2 block text-sm text-gray-800 rounded flex items-center gap-2 hover:bg-indigo-50 hover:text-indigo-500">Log out</a>
                            </li>
                        </ul>
                        </a>
                    </li>
                </ul>  
            </div> 
            <div x-data="{ open: false }" className="lg:hidden relative flex justify-between w-full">
                <a href="index.html" className="flex items-start gap-2 group">
                    <p className="text-sm font-bold uppercase">Solfan logo</p>
                </a>
                <button x-on:click="open = !open" type="button" className="bg-gray-200 p-3 rounded-md">
                    <svg x-show="!open" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <svg x-show="open" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div x-show="open" x-transition className="absolute top-14 left-0 right-0 w-full bg-white rounded-md border">
                    <ul className="p-4 font-semibold">
                        <a href="new-post.html" className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create New post</a>
                        <li className="px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-500 mt-4 mb-2">
                            <a href="#" className="flex items-center gap-4">View my page</a>
                        </li>
                        <li className="px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-500 mb-2">
                            <a href="my-account.html" className="flex items-center gap-4">My account</a>
                        </li>
                        <li className="px-4 py-2 rounded hover:bg-indigo-50 hover:text-indigo-500">
                            <a href="#" className="flex items-center gap-4">Logout</a>
                        </li>
                    </ul>
    
                </div>
            </div> 
        </nav> 
        <main className="container mx-w-6xl mx-auto py-4">
            <div className="flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                    <!-- main content -->
                    <div className="container col-span-4">
                        <!-- Recent posts -->
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-semibold">RECENT POSTS</span>
                            </div>
                            <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                                <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">Post title<br/><span className="text-sm text-gray-600" style="font-weight: 400;">Feb 11, 2022 at 11:54 PM</span></p>
                                    <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                                        <a href="edit-post.html" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </a>
                                        <a href="#" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </a>
                                    </p>
                                </li>
                                <li className="py-6 flex justify-between text-base text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">Post title<br/><span className="text-sm text-gray-600" style="font-weight: 400;">Feb 11, 2022 at 11:54 PM</span></p>
                                    <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                                        <a href="edit-post.html" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </a>
                                        <a href="#" className="mr-2 hover:text-indigo-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </a>
                                    </p>
                                </li>
                            </ul>
                        </div> 
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500 font-semibold mb-1">CONTRIBUTORS</span>
                            </div>
                            <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                                <li className="pb-3 flex justify-between text-sm text-gray-500 font-semibold">
                                    <p className="px-4 font-semibold">Wallet ID</p>
                                    <p className="px-4 font-semibold">Subscribed since</p>
                                </li>
                                <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">apodsifhla</p>
                                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                                </li>
                                <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">apodsifhla</p>
                                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                                </li>
                                <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">apodsifhla</p>
                                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                                </li>
                                <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                                    <p className="px-4 text-gray-800">apodsifhla</p>
                                    <p className="px-4 text-gray-800">Jan 12, 2022</p>
                                </li>
                            </ul>
                        </div> 
                    </div> 
                    <div className="container col-span-1">
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                            <div className="grid">
                                <span className="text-xs text-gray-500 font-semibold mb-1">TOTAL EARNINGS</span>
                                <h2 className="font-bold text-4xl mb-1">2,85 SOL</h2>
                                <span className="text-xs text-gray-500 font-regular">145 USD</span>
                            </div>
                        </div>
                        <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                            <div className="grid">
                                <span className="text-xs text-gray-500 font-semibold mb-1">TOTAL SUPPORTERS</span>
                                <h2 className="font-bold text-4xl mb-1">145</h2>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </main> 
    </body>*/
}
