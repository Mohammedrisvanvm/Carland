import React, { FC, ReactNode, useState } from "react";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";
import Pages from "./Pages";
import { useAppSelector } from "../../../redux/store/storeHook";

const LeftSide: FC = () => {
  const [page, setPage] = useState<string>("Account");

  const user = useAppSelector((state) => state.user);
  return (
    <>
      <MainHeader />
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2 ">
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
            <div>
              <div className="relative pb-56 mb-4 sm:mx-36 mx-10 mt-12 sm:mt-0 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col  text-center">
                <p className="text-lg font-bold"> {user.userName}</p>
                <p className="mb-5 text-xs text-gray-800">
                  {user.email}
                </p>
                <hr className="mx-6" />

                <ul className=" m-3 text-center  space-y-3 font-medium tracking-wide text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400">
                  <li className="flex  flex-row justify-center  items-center">
                    Profile Document
                    <span>
                      <img
                        className="h-4 w-4"
                        src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                        alt=""
                      />
                    </span>
                  </li>

                  <li className="flex flex-row justify-center items-center">
                    Mobile Number
                    {user.verifyPhone ? (
                      <>
                        {" "}
                        <span>
                          <img
                            className="h-5 w-5"
                            src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
                            alt=""
                          />
                        </span>
                      </>
                    ) : (
                      <>
                        {" "}
                        <span>
                          <img
                            className="h-4 w-4"
                            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                            alt=""
                          />
                        </span>
                      </>
                    )}
                  </li>
                </ul>

                <hr className="mx-6" />

                <div className="flex items-center m-4 space-x-3 justify-center">
                  <ul className="sm:text-start text-center space-y-3 font-medium tracking-wide text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400">
                    <li>
                      <button
                        aria-label="Account"
                        onClick={() => setPage("Account")}
                        title="Account"
                      >
                        Account
                      </button>
                    </li>
                    <hr />
                    <li>
                      <button
                        aria-label="Mybooking"
                        onClick={() => setPage("Account")}
                        title="bookings"
                      >
                        my bookings
                      </button>
                    </li>
                    <hr />
                    <li>
                      <button
                        aria-label="Verification"
                        onClick={() => setPage("Verification")}
                        title="Verification"
                      >
                        Profile Verification
                      </button>
                    </li>
                    <hr />
                    <li>
                      <button aria-label=" Wallet" title=" Wallet">
                        Wallet
                      </button>
                    </li>
                    <hr />
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
            <Pages role={page} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
