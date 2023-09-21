import { useNavigate } from "react-router";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import { LoginHeader } from "../components/userHeader/loginHeader/loginHeader";
import { useAppSelector } from "../redux/store/storeHook";
import { useState } from "react";

export const Content = () => {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  return (
    <>
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

          {user?.email ? (
            <li className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400 flex">
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
              <p className="font-medium mb-4 tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400">
                mohammed risvan vm
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
                  aria-label="About us"
                  title="About us"
                  className="mr-10 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                >
                  logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Oliver Aguilerra</p>
            <p className="mb-5 text-xs text-gray-800">Product Manager</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Marta Clermont</p>
            <p className="mb-5 text-xs text-gray-800">Design Team Lead</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">Alice Melbourne</p>
            <p className="mb-5 text-xs text-gray-800">Human Resources</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="relative pb-56 mb-4 rounded shadow lg:pb-64">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              alt="Person"
            />
          </div>
          <div className="flex flex-col sm:text-center">
            <p className="text-lg font-bold">John Doe</p>
            <p className="mb-5 text-xs text-gray-800">Good guy</p>
            <div className="flex items-center space-x-3 sm:justify-center">
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </a>
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
