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

  return (
    <>
      <nav className="w-full flex justify-between items-center navbar ">
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
