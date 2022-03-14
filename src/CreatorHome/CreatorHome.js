/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import solfansLogo from "../assets/solfans_logo.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { MyUtil } from "../utils/my_util";
import Menu from "../Widgets/Menu";
import { Program, web3 } from "@project-serum/anchor";
import { baseAccount, getProvider, programID } from "../App";
import idl from "../idl.json";

const { SystemProgram } = web3;

export default function CreatorHome() {
  const {
    connectedUser,
    solanaPrice,
    walletAddress,
    users,
    setUser,
    setWalletAddress,
    setRefreshData,
    refreshData,
  } = useContext(UserContext);

  const renderSubscriptions = () => {
    console.log(connectedUser);
    return (
      <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
        <li className="pb-3 flex justify-between text-sm text-gray-500 font-semibold">
          <p className="px-4 font-semibold">Wallet ID</p>
          <p className="px-4 font-semibold">Subscribtion end</p>
        </li>
        {connectedUser.followers.map((subscription, index) => {
          if (MyUtil.isSubscriptionValid(subscription))
            return (
              <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                <p className="px-4 text-gray-800">
                  {subscription.userAddress.toString()}
                </p>
                <p className="px-4 text-gray-800">
                  {MyUtil.timeConverter(
                    subscription.subscriptionEnd.toNumber()
                  )}
                </p>
              </li>
            );
        })}
      </ul>
    );
  };

  function renderPostPreview(item) {
    var postPreview;
    var postPreviewStyle = {
      height: "80px",
      width: "120px",
      borderRadius: "6px",
      backgroundColor: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    if (item.link === "")
      postPreview = (
        <div style={postPreviewStyle}>
          {/* text preview */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
      );

    MyUtil.isImage(item.link)
      ? (postPreview = (
          <div
            style={{
              ...postPreviewStyle,
              backgroundImage: "url(" + item.link + ")",
            }}
          >
            {/* image preview */}
          </div>
        ))
      : MyUtil.isVideo(item.link)
      ? (postPreview = (
          <div style={postPreviewStyle}>
            {/* video icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
          </div>
        ))
      : (postPreview = (
          <div style={postPreviewStyle}>
            {/* link icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        ));

    return (
      <Link to="/post/view" state={{ post: item, creator: connectedUser }}>
        {postPreview}
      </Link>
    );
  }

  const renderPostList = () => {
    return (
      <ul
        className="divide-y-2 divide-gray-100 overflow-x-auto w-full"
        style={{ marginTop: 0 }}
      >
        {connectedUser.contents
          .slice(0)
          .reverse()
          .map((item, index) => {
            return (
              <li className="pb-6 pt-6 flex items-center text-base text-gray-500 font-semibold">
                {renderPostPreview(item)}
                <p className="px-4 text-gray-800 flex-auto">
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
                    <Link
                      to="/post/view"
                      state={{ post: item, creator: connectedUser }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                  }
                  {
                    <a
                      href="#"
                      onClick={() => showDeleteClick(item)}
                      className="mr-2 hover:text-indigo-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </a>
                  }
                </p>
              </li>
            );
          })}
      </ul>
    );
  };

  const renderCreator = () => {
    return (
      <div className="flex flex-col mx-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
          <div className="container col-span-4">
            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-semibold">
                  RECENT POSTS
                </span>
              </div>
              {connectedUser.contents.length ? (
                renderPostList()
              ) : (
                <div
                  style={{ padding: "50px 0px" }}
                  className="bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6 items-center"
                >
                  <span className="text-2xl text-gray-500 font-semibold">
                    You haven't create any posts yet.
                  </span>
                  <div className="content-around">
                    <Link
                      to="/post/new"
                      className="px-4 py-2 m-10 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100"
                    >
                      Create your first post
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 font-semibold mb-1">
                  CONTRIBUTORS
                </span>
              </div>
              {renderSubscriptions()}
            </div>
          </div>
          <div className="container col-span-1">
            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
              <div className="grid">
                <span className="text-xs text-gray-500 font-semibold mb-1">
                  TOTAL EARNINGS (SOL)
                </span>
                <h2 className="font-bold text-4xl mb-1">
                  {MyUtil.convertPriceInSol(connectedUser.total.toNumber())}
                </h2>
                <span className="text-xs text-gray-500 font-regular">
                  {(
                    MyUtil.convertPriceInSol(connectedUser.total.toNumber()) *
                    solanaPrice
                  ).toFixed(2)}{" "}
                  $
                </span>
              </div>
            </div>
            <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
              <div className="grid">
                <span className="text-xs text-gray-500 font-semibold mb-1">
                  TOTAL SUPPORTERS
                </span>
                <h2 className="font-bold text-4xl mb-1">
                  {connectedUser.followers.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // duplicated in Menu.js
  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      const wallet = response.publicKey.toString();
      console.log("Connected with Public Key:", wallet);
      setWalletAddress(wallet);
      var user = users.find(
        (user) => user.userAddress.toString() === response.wallet
      );
      if (user != null && wallet != null) {
        setUser(user);
      }
    }
  };

  // duplicated in Menu.js
  const drawNoConnectedButton = () => {
    return (
      <ul className="flex items-center gap-2 mx-4">
        <li>
          <button
            onClick={connectWallet}
            className="px-4 py-2 text-sm bg-indigo-100 text-indigo-500 rounded uppercase tracking-wider font-semibold hover:bg-indigo-200"
          >
            Connect to Wallet
          </button>
        </li>
      </ul>
    );
  };

  const renderNotConnectedUser = () => {
    return (
      <div className="flex flex-col mx-4 space-y-8 pt-3">
        <div className="container col-span-2">
          <br />
          <div className="bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6 items-center">
            <img src={solfansLogo} alt="solfans" width={200}></img>
            <span className="text-2xl text-gray-500 font-semibold">
              Become a Creator and start earning SOL from your community!
            </span>
            {drawNoConnectedButton()}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  };

  const renderBecomeCreatorButton = () => {
    return (
      <div>
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
            <div className="container md:col-start-2 col-span-3">
              <div className="col-span-1 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-semibold">
                    MY ACCOUNT
                  </span>
                </div>
                <ul className="flex space-x-2 xl:space-x-4 text-sm font-semibold">
                  <Link
                    to={"/creator/account"}
                    className="px-4 py-2 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider font-semibold hover:bg-indigo-600 hover:text-indigo-100"
                  >
                    Become a creator
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOneTimeInizialization = () => {
    // If we hit this, it means the program account hasn't been initialized.
    if (users === null) {
      return (
        <div className="connected-container">
          <button
            className="cta-button submit-gif-button"
            onClick={createTopContentAccount}
          >
            Do One-Time Initialization Solfans
          </button>
        </div>
      );
    }
  };

  const createTopContentAccount = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      await program.rpc.initialize({
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });
      console.log(
        "Created a new BaseAccount w/ address:",
        baseAccount.publicKey.toString()
      );
    } catch (error) {
      console.log("Error creating BaseAccount account:", error);
    }
  };

  const showDeleteClick = (item) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteContent(item);
    }
  };

  const deleteContent = async (item) => {
    try {
      const index = connectedUser.contents.indexOf(item);

      const provider = getProvider();
      console.log(provider);
      const program = new Program(idl, programID, provider);

      console.log(baseAccount.publicKey);
      console.log(walletAddress);

      await program.rpc.deleteContent(index, {
        accounts: {
          baseAccount: baseAccount.publicKey,
          user: walletAddress,
        },
      });

      setRefreshData(!refreshData);
    } catch (error) {
      console.log("Error uploading content:", error);
    }
  };

  const deletePostModal = () => {
    // if(itemToDelete){
    //   return (
    //     <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full">
    //       <div className="relative px-4 w-full max-w-md h-full md:h-auto">
    //           <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
    //               <div className="flex justify-end p-2">
    //                   <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
    //                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    //                   </button>
    //               </div>
    //               <div className="p-6 pt-0 text-center">
    //                   <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    //                   <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
    //                   <button onClick={()=>{deleteContent(itemToDelete)}} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
    //                       Yes, I'm sure
    //                   </button>
    //                   <button onClick={()=>{setShowDeletePostModal(false)}} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
    //                     No, cancel
    //                   </button>
    //               </div>
    //           </div>
    //       </div>
    //     </div>
    //   );
    // }
  };

  return (
    <div className="relative antialiased bg-gray-100 min-h-screen">
      {walletAddress && Menu(connectedUser, false, true)}
      <main className="container mx-w-6xl mx-auto py-4">
        {walletAddress && !users && renderOneTimeInizialization(false)}
        {connectedUser && connectedUser.creator && renderCreator()}
        {connectedUser && !connectedUser.creator && renderBecomeCreatorButton()}
        {!connectedUser && walletAddress && renderBecomeCreatorButton()}
        {!walletAddress && renderNotConnectedUser()}
        {/* {showDeletePostModal && deletePostModal()} */}
      </main>
    </div>
  );
}
