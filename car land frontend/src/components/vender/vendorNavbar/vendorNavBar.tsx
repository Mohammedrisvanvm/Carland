import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/storeHook";
import { vendorLogout } from "../../../redux/slice/vendorSlice";
import { vendorSignOut } from "../../../services/apis/vendorApi/vendorApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

type Iprop = {
  nav?: boolean;
  setNav?: React.Dispatch<React.SetStateAction<boolean>>;
};

const VendorNavBar = ({ nav, setNav }: Iprop) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const vendor=useAppSelector((state)=>state.vendor)
  console.log(vendor);
  const [dropdown, setdropdown] = useState(false);

  const dropdownHandler = () => {
    setdropdown(!dropdown);
  };
  const logOutHandle = async () => {
    await vendorSignOut();
    dispatch(vendorLogout());
    Navigate("/vendor/login");
  };

  return (
    <>
      <nav className="fixed top-0 block z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => {
                  if (setNav) {
                    setNav(!nav);
                  }
                }}
                className={`items-center p-2 text-sm block text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <img
                src="/carland-logos_black.png"
                className="h-14 w-22"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Car Land Vendor
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    onClick={dropdownHandler}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 ${
                    dropdown ? "block" : "hidden"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-full`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                    {vendor.userName}
                    </span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {vendor.email}
                    </span>
                  </div>

                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {/* <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li> */}
                    <li>
                      <button
                        onClick={logOutHandle}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default VendorNavBar;
