/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useContext, } from "react";
import solfansLogo from "../assets/solfans_logo.png" 
import { UserContext } from "../App";
import { MyUtil } from "../utils/my_util";

export default function CreatorHome() {
  const {connectedUser} = useContext(UserContext);

  const renderPostList = () => {  
    return(
      <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
        {
        connectedUser.contents.map((item, index) => {  
          return (
            <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">
                      {item.description}
                      <br />
                      <span
                        className="text-sm text-gray-600"
                        style={{ fontWeight: 400 }}
                      >
                        {MyUtil.timeConverter(item.date.toNumber())}
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
                  
                  </li>)})}
      </ul>
    );
  }

  const renderSubscriptions = () => {
    console.log(connectedUser)
    return (
            <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
              <li className="pb-3 flex justify-between text-sm text-gray-500 font-semibold">
                <p className="px-4 font-semibold">Wallet ID</p>
                <p className="px-4 font-semibold">Subscribtion end</p>
              </li>
          {
            connectedUser.subscriptions.map((subscription, index) => {
              if(MyUtil.isSubscriptionValid(subscription)) 
                return (
                    <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                      <p className="px-4 text-gray-800">{subscription.userAddress.toString()}</p>
                      <p className="px-4 text-gray-800">{MyUtil.timeConverter(subscription.subscriptionEnd.toNumber())}</p>
                    </li>
              ) 
            })
          }
      </ul>
      )
  }
  
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
                {
                  renderPostList()
                }
              </div>
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    CONTRIBUTORS
                  </span>
                </div>
                {
                  renderSubscriptions()
                }
              </div>
            </div>
            <div className="container col-span-1">
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                <div className="grid">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    TOTAL EARNINGS - TODO
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
                  <h2 className="font-bold text-4xl mb-1">{
                      connectedUser.subscriptions.length
                    }</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
