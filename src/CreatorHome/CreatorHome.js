/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import solfansLogo from "../assets/solfans_logo.png";
import { useContext, useEffect } from "react";
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
  } = useContext(UserContext);

  const renderPostList = () => {
    return (
      <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full" style={{marginTop: 0}}>
        {connectedUser.contents
          .slice(0)
          .reverse()
          .map((item, index) => {
            return (
              <li className="pb-6 pt-6 flex justify-between text-base text-gray-500 font-semibold">
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
                            strokeLinecap="round"
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
                            strokeLinecap="round"
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
              </li>
            );
          })}
      </ul>
    );
  };

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
              {
              connectedUser.contents.length ? renderPostList() : 
                <div style={{padding: "50px 0px"}} className="bg-white col-span-3 p-6 mx-4 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6 items-center">
                  <span className="text-2xl text-gray-500 font-semibold">
                    You haven't create any posts yet.
                  </span>
                    <div className="content-around">
                        <Link to="/post/new" className="px-4 py-2 m-10 text-sm bg-indigo-700 text-white rounded uppercase tracking-wider text-center font-semibold hover:bg-indigo-600 hover:text-indigo-100">Create your first post</Link>
                    </div>
                </div>
              }
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
            <br/>
          <div className="bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6 mb-6 items-center">
          <img src={solfansLogo} alt="solfans" width={200}></img>
            <span className="text-2xl text-gray-500 font-semibold">
              Become a Creator and start earning SOL from your
              community!
            </span>
            {drawNoConnectedButton()}
            <br/>
            <br/>
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

  return (
    <body className="relative antialiased bg-gray-100 min-h-screen">
      {walletAddress && Menu(connectedUser, false, true)}
      <main className="container mx-w-6xl mx-auto py-4">
        {walletAddress && !users && renderOneTimeInizialization(false)}
        {connectedUser && connectedUser.creator && renderCreator()}
        {connectedUser && !connectedUser.creator && renderBecomeCreatorButton()}
        {!connectedUser && walletAddress && renderBecomeCreatorButton()}
        {!walletAddress && renderNotConnectedUser()}
      </main>
    </body>
  );
}
