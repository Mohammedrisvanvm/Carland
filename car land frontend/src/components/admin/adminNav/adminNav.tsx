import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../redux/store/storeHook";
import { adminSignOut } from "../../../services/apis/adminApi/adminApi";
import { adminLogout } from "../../../redux/slice/adminSlice";


type Iprops = {
  sidebarWidth: boolean;
  spanVisible: boolean;
  setsidebarWidth: React.Dispatch<React.SetStateAction<boolean>>;
  setSpanVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminNavBar: FC<Iprops> = ({
  setSpanVisible,
  setsidebarWidth,
  sidebarWidth,
  spanVisible,
}) => {
  const dispatch = useDispatch();
  const admin = useAppSelector((state) => state.admin);

  const [dropdown, setdropdown] = React.useState<boolean>(false);

  const dropdownHandler = () => {
    console.log("hai");

    setdropdown(!dropdown);
  };
  const logOutHandle = async () => {
    await adminSignOut();
    dispatch(adminLogout());
    Navigate("/admin");
  };
  const Navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="flex justify-between items-center px-6">
        <button
          id="menu-button"
          onClick={() => {
            // expandSidebar()
            setsidebarWidth(!sidebarWidth);
            setSpanVisible(!spanVisible);
          }}
        >
          {/* <button id="menu-button" onclick="expandSidebar()"> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            viewBox="0 0 100 100"
          >
            <rect width="60" height="8" rx="4" fill="gray" x="20" y="20" />
            <rect width="60" height="8" rx="4" fill="gray" x="20" y="40" />
            <rect width="60" height="8" rx="4" fill="gray" x="20" y="60" />
          </svg>
        </button>
        <div className="mx-auto">
          <img
            src="/carland-logos_black.png"
            alt="logo"
            className="h-16 w-24"
          />
        </div>
        <div className="space-x-12">
     
          <button onClick={dropdownHandler}>
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
          </button>
          <div
            className={`z-50 ${
              dropdown ? "block" : "hidden"
            } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-5 `}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                {admin.userName}
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {admin.email}
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
                <div
                  onClick={logOutHandle}
                  className="block px-4 py-2 text-sm text-white  bg-red-600 hover:bg-black dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
