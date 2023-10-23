import React, { FC, ReactNode, useState, useEffect } from "react";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";
import Pages from "./Pages";
import { useAppSelector } from "../../../redux/store/storeHook";
import { Authcheck, user } from "../../../interfaces/userAuth";
import { currrentUserFetch } from "../../../services/apis/userApi/userApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
type Iprop = {
  value?: string;
};
const LeftSide: FC<Iprop> = ({ value }) => {
  const [page, setPage] = useState<string>(value ? value : "Account");
  const [loading, setloading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<user | undefined>(undefined);
  useEffect(() => {
    const fetchUser = async () => {
      const { data }: Authcheck = await currrentUserFetch();

      setCurrentUser(data?.user);
    };
    fetchUser();
  }, [loading]);

  console.log(currentUser);

  const user = useAppSelector((state) => state.user);
  return (
    <>
      <MainHeader />
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 h-screen">
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
                <p className="mb-5 text-xs text-gray-800">{user.email}</p>
                <p className="mb-5 text-xs text-gray-800">
                  {currentUser?.gender}
                </p>
                <hr className="mx-6" />

                <ul className=" m-3 text-center  space-y-3 font-medium tracking-wide text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400">
                  <li className="flex  flex-row justify-center  items-center">
                    Profile Document
                    {currentUser?.verifiedProfile ? (
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

                  <li className="flex flex-row justify-center items-center">
                    Mobile Number
                    {currentUser?.verified_phonenumber ? (
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
                        onClick={() => setPage("Bookings")}
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
                        disabled={
                          currentUser?.profileVerificationRequest ||
                          currentUser?.verifiedProfile
                        }
                        className={`${
                          currentUser?.profileVerificationRequest
                            ? "disabled"
                            : ""
                        }`}
                      >
                        Profile Verification
                        <span className="mr-2 text-sm text-center text-orange-500">
                          {" "}
                          {currentUser?.profileVerificationRequest
                            ? "pending"
                            : ""}
                        </span>
                        <span className="mr-2 text-sm text-center text-green-500">
                          {" "}
                          {currentUser?.verifiedProfile ? "verified" : ""}
                        </span>
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
          <div className="transition duration-300 transform rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center ">
            <Pages role={page} setloading={setloading} loading={loading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
