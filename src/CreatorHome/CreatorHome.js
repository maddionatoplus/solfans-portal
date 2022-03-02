/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { useContext, } from "react";
import { UserContext } from "../App";
import { MyUtil } from "../utils/my_util";
import Menu from "../Widgets/Menu";

export default function CreatorHome() {
  const {connectedUser, solanaPrice} = useContext(UserContext);

  const renderPostList = () => {  
    return(
      <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
        {
        connectedUser.contents.map((item, index) => {  
          return (
                  <li className="pb-6 flex justify-between text-base text-gray-500 font-semibold">
                    <p className="px-4 text-gray-800">
                      {item.title}
                      <br />
                      <span
                        className="text-sm text-gray-600"
                        style={{ fontWeight: 400 }}
                      >
                        {MyUtil.timeConverter(item.date.toNumber())}
                      </span>
                    </p>
                    <p className="md:text-sm text-gray-800 flex gap-1 cursor-pointer">
                    {
                      <Link to="/post" state={{post:item, creator: connectedUser}}> 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </Link>
                     /* 
                    <Link to="/post/edit">
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
                      <Link to="/post/edit">
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
                      */
                    }
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
            connectedUser.followers.map((subscription, index) => {
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
      {Menu(connectedUser)}  
      <main className="container mx-w-6xl mx-auto py-4">
        <div className="flex flex-col mx-4 space-y-8">
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
                    TOTAL EARNINGS (SOL)
                  </span>
                  <h2 className="font-bold text-4xl mb-1">{connectedUser.total.toNumber()}</h2>
                  <span className="text-xs text-gray-500 font-regular">
                  {connectedUser.total.toNumber() * solanaPrice} $
                  </span>
                </div>
              </div>
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
                <div className="grid">
                  <span className="text-xs text-gray-500 font-semibold mb-1">
                    TOTAL SUPPORTERS
                  </span>
                  <h2 className="font-bold text-4xl mb-1">{
                      connectedUser.followers.length
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
