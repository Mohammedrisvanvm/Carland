import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoginHeader } from "../loginHeader/loginHeader";
import { useAppSelector } from "../../../redux/store/storeHook";
import { userSignOut } from "../../../services/apis/userApi/userApi";
import { userLogout } from "../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";

export const MainHeader = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState<boolean>(false);

  const user = useAppSelector((state) => state.user);
  const UserLogout = async () => {
    await userSignOut();
    dispatch(userLogout());
    setToggle(!toggle);
    Navigate("/");
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let check: Authcheck | null = await userCheck();
  //       console.log(check);

  //       if (check && check.data && check.data.user) {
  //         dispatch(userLoginThunk(check.data.user));
  //       } else {
  //         console.error(
  //           "User data is undefined or not in the expected format."
  //         );
  //       }
  //     } catch (error: any) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <>
      {/* <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          className="inline-flex items-center"
        >
         <img src="/carland-logos_black.png" alt=""className="h-20 w-auto contain"/>
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Car Land
          </span>
        </a>
        <ul className=" items-center hidden space-x-8 lg:flex">
          <li>
            <button
              onClick={()=>Navigate('/')}
              aria-label="Our product"
              title="home"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Home
            </button>
          </li>

          <li>
            <button
              aria-label="About us"
              title="About us"
              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              About us
            </button>
          </li>

          {user?.email ? (
        
            <li className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 flex">
             
              <span className="ml-1">
                <LoginHeader />
              </span>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  Navigate("/UserAuth");
                }}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white  transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </button>
            </li>
          )}
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full ">
              <div className="p-5 bg-black text-white border rounded shadow-sm">
                <div className="flex items-center text-white justify-between mb-4">
                  <div>
                    <a
                      href="/"
                      aria-label="Company"
                      title="Company"
                      className="inline-flex items-center"
                    >
                      <svg
                        className="w-8 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                      >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                      </svg>
                      <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Company
                      </span>
                    </a>
                  </div>
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200  rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-white" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul className="space-y-4 text-white">
                    <li>
                      <LoginHeader  />
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="Product pricing"
                        title="Product pricing"
                        className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <button
                        aria-label="Our product"
                        title="Our product"
                        className="font-medium tracking-wide  transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        {user?.userName}
                       
                      </button>
                    </li>
                    <li>
                      <a
                        href="/"
                        aria-label="About us"
                        title="About us"
                        className="font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400"
                      >
                        About us
                      </a>
                    </li>

                    <li>
                      <button
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div> */}

      <nav className="w-full flex py-6 justify-between items-center navbar">
        <img
          src="/carland-logos_black.png"
          alt=""
          className="px-10 h-16 w-auto contain"
        />
        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
          car land
        </span>

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          <li>
            <button
              onClick={() => Navigate("/")}
              aria-label="Our product"
              title="home"
              className="font-medium tracking-wide text-gray-700 mr-10 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Home
            </button>
          </li>

          <li>
            <button
              aria-label="About us"
              title="About us"
              className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              About us
            </button>
          </li>
          <div
            className={`${
              toggle ? "flex z-10" : "hidden"
            } py-6  absolute top-20 right-0 bg-white mx-12 my-2 w-36 h-auto rounded-xl sidebar`}
          >
            <ul className="text-black mx-5 ">
              {user?.email ? (
                <>
                  <p className="font-medium mb-4 tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    {user?.userName}
                  </p>
                  <hr className="my-2 bg-black" />
                  <li className="mb-4">
                    <button
                      onClick={() => Navigate("/")}
                      aria-label="Our product"
                      title="home"
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => UserLogout()}
                      aria-label="logout"
                      title="logout"
                      className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-4">
                    <button
                      onClick={() => {
                        Navigate("/UserAuth");
                      }}
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        Navigate("/UserAuth");
                      }}
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          {user?.email ? (
            <li className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 flex">
              <button
                type="button"
                onClick={() => setToggle(!toggle)}
                className="flex items-center text-sm rounded-full  hover:focus:ring-4 focus:ring-gray-300"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
                  alt=""
                />
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={() => {
                  Navigate("/UserAuth");
                }}
                className="mr-10 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white  transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Sign up
              </button>
            </li>
          )}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            className="h-6 mr-10 object-contain"
            onClick={() => setToggle(!toggle)}
            src={
              toggle
                ? `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAAB3CAMAAAAq0mI9AAAAZlBMVEX///8AAAD8/Pz5+fl8fHyBgYH29vaHh4fq6upqamqNjY1tbW14eHh1dXWSkpJnZ2deXl6lpaVNTU0wMDDd3d2dnZ06Ojqzs7MiIiInJyfJyckJCQmtra25ubnS0tIZGRlWVlZCQkKq97yoAAAC7klEQVR4nO2abXeiMBCFSaiCIr7barta/f9/clUWCncCJNRJ2HPm+Vrn5HYmcxMGokgQBEEQBEEQBEEQBIpOpwMj41S/VImJfb47ndafAyIv691pl+1frqjB55d6snGO/FMEqnPEmMS9Kpk7Ri6ryAuLsoK8WkUtnQIPP4Ervvyl32qYwE0tTqV8+urLqIl13FKF0GedwY3ypG+6ba5k1ySHZtD7UPu04KO5lFWJlxDjbk0OrGGxQ28EFFdtOeVFegHLJT0BmL1VzKovinMngbD31Jpx8xXoFSzZ1cVY3Cu7vLvAN1j0rfWnc/jlzIO8e4kxg/OWEwuL6yN7D3SGAq3k8e+9khi72FTiMMUtsGgS4nvMxtKEZBBPEt++RwSiDzZLjPL87b0SjUddvUlIcb3LM/hgXv2JtIbn4hbEM5CR/PPBcMbSJ9AsL0j2ngJNJQ7pewhpkkSH9T2E2Aw8AahVwOwZBY5LnqHEjWwGl2fwwVprBN17JTFet0pC+R5CbjMFvq6j/RAffJCNRp4xg9dR7L0SfQN5nFOMASQkf+1PdQHAK8EDtwEmKzR7o8og3lhKJvyvE2wwFbfAdYjOwqRVXv3KHwx8UmuShC4xyjuiwLDysLjZFHt5EVIemVDdDzW74ZEXMFfFfQ9zGswHibzizNUjEUhmLNWNZRQlxizltQsVnigBfBAlNAdoZPzm2wf75nt4o/bsg2SwgbdljfnNfMojrWEoH3mR46/EaCy5cWn8lTeb6ercGtru33g5pDVal3V9mfgSyOnQkZUAPohFy7qec+lRx/1UTKajPXsKjcj+o4pBkOV6tzzu1hmnvDMW16Ij8V/64JMXX5tLLawMA3bsjW/yAd+/WB76eNT5+j7H/kRd+NL3Vc+eQ+Dcj776i/MuW6bU9iDn66RLtYrrWfrTxUO+vbSmfDvkPjwrH0X7vzj6FZfr8ft4G+Jh59s9csuavSfpZegGT/d8rSEIgiAIgiAIgiAI/zN/AdMdF0QVhV8eAAAAAElFTkSuQmCC`
                : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAS1BMVEX///8AAADc3Ny3t7cODg4GBgYlJSWsrKzHx8e7u7u0tLQxMTHQ0NDr6+ssLCyKior29vbj4+N5eXloaGhubm4ZGRl/f39ISEhNTU2TeIu2AAABEElEQVRoge3aWxaCIBhFYSAjzazMbvMfaVovLdBH/tNlfxPYKzEUwTkAAAAAi7bnWJUUz9uFcmh9eW2YS+8MypNdnu72Ru19l7UPRmnvD2n6aDHYL+1RNNqTdMRrw3b9Qe3+Ypa+9OnNdjdr37P/mN1FTy/56GqUvuZpq/hs2rnmVrx8a+bT4+QWmlVJTUinNAAAfkUfSspeEt/Cp1itS6riaSG/Kf7WMtno0rPxYJT2Pl/9D2btIU130awd08X/v66Blb9bOd7K+1z6/1bOa9L5XPoce+ZVz28AAL6a8Duy8Pu5cN9AuF+i3CcS7o8p9wX/dS9WuQZW7vsrzztIz3koz7dIz/U45XkmAAAAAKMHCeMiEBb9gpsAAAAASUVORK5CYII=`
            }
            alt=""
          />
          <div
            className={`${
              toggle ? "flex z-10" : "hidden"
            } py-6  absolute top-20 right-0 bg-white mx-12 my-2 w-36 h-auto rounded-xl sidebar`}
          >
            <ul className="text-black mx-5 ">
              {user?.email ? (
                <>
                  <p className="font-medium mb-4 tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                    {user?.userName}
                  </p>
                  <hr className="my-2 bg-black" />
                  <li className="mb-4">
                    <button
                      onClick={() => Navigate("/")}
                      aria-label="Our product"
                      title="home"
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={() => UserLogout()}
                      aria-label="logout"
                      title="logout"
                      className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                    >
                      logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-4">
                    <button
                      onClick={() => {
                        Navigate("/UserAuth");
                      }}
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      login
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        Navigate("/UserAuth");
                      }}
                      className="font-medium  tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                      aria-label="Sign up"
                      title="Sign up"
                    >
                      Sign up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
