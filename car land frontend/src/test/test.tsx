import { useNavigate } from "react-router";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import { LoginHeader } from "../components/userHeader/loginHeader/loginHeader";
import { useAppSelector } from "../redux/store/storeHook";
import { useState } from "react";
import MyAccount from "../components/user/profile/MyAccount";

export const Content = () => {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  const handleSubmit=()=>{
    console.log("hai");
    
  }
  return (
    <>
      <MainHeader />

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2 ">
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
            <div>
              <div className="relative pb-56 mb-4 sm:mx-36 mx-10 my-12 rounded shadow lg:pb-64">
                <img
                  className="absolute object-cover w-full h-full rounded"
                  src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt="Person"
                />
              </div>
              <div className="flex flex-col  text-center">
                <p className="text-lg font-bold">John Doe</p>
                <p className="mb-5 text-xs text-gray-800">
                  risvanguest0000@gmail.com
                </p>
                <hr className="mx-6" />

                <ul className=" m-3 text-center  space-y-3 font-medium tracking-wide text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400">
                  <li className="flex  flex-row justify-center  items-center">
                    Profile Document
                    <span>
                      <img
                        className="h-5 w-5"
                        src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
                        alt=""
                      />
                    </span>
                  </li>

                  <li className="flex flex-row justify-center items-center">
                    Mobile Number
                    <span>
                      <img
                        className="h-5 w-5"
                        src="https://img.freepik.com/premium-vector/verified-vector-icon-account-verification-verification-icon_564974-1246.jpg?w=2000"
                        alt=""
                      />
                    </span>
                  </li>
                </ul>

                <hr className="mx-6" />

                <div className="flex items-center m-4 space-x-3 justify-center">
                  <ul className="sm:text-start text-center space-y-3 font-medium tracking-wide text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400">
                    <li>
                      <button aria-label="Account" title="Account">
                        Account
                      </button>
                    </li>
                    <hr />
                    <li>
                      <button aria-label="Verification" title="bookings">
                        my bookings
                      </button>
                    </li>
                    <hr />
                    <li>
                      <button aria-label="Verification" title="Verification">
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
            <div className="justify-between sm:mt-5">
              <h5 className="sm:m-16 m-10 text-xl text-center font-bold leading-none sm:text-2xl">
                Profile verification
              </h5>
              <form onSubmit={handleSubmit}>
                <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
                  License Details
                </h5>
                <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 ">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        required
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>

                  <h3 className="text-center sm:hidden"> Front</h3>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        required
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <h3 className="text-center sm:hidden "> Back</h3>
                  <div className="text-center font-semibold hidden sm:block">
                    Front
                  </div>
                  <div className="text-center hidden sm:block font-semibold">
                    Back
                  </div>
                </div>
                <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
                  Aadhar Details
                </h5>
                <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6 ">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        required
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>

                  <h3 className="text-center sm:hidden"> Front</h3>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        required
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <h3 className="text-center sm:hidden "> Back</h3>
                  <div className="text-center font-semibold hidden sm:block">
                    Front
                  </div>
                  <div className="text-center hidden sm:block font-semibold">
                    Back
                  </div>
                </div>

                <div className="m-6 flex justify-center">
                  <button
                    type="submit"
                    className="text-white  bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
