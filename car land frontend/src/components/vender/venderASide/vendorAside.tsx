import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { rmhubId } from "../../../redux/slice/vendorSlice";

type Iprop = {
  spanVisible: boolean;
};
const VendorAside: FC<Iprop> = ({ spanVisible }) => {
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const highlightSidebarItem: (element: HTMLElement | any) => void = (
    element
  ) => {
    const buttons = document.querySelectorAll(
      "#sidebar button"
    ) as unknown as HTMLButtonElement[];
    buttons.forEach((btn: any) => {
      btn.classList.remove(
        "bg-gradient-to-r",
        "from-cyan-400",
        "to-cyan-500",
        "text-white",
        "w-48",
        "ml-0"
      );
      btn.firstChild?.nextSibling?.classList.remove("text-white");
    });
    element.classList.add(
      "bg-gradient-to-r",
      "from-cyan-400",
      "to-cyan-500",
      "w-56",
      "h-10",
      "ml-0"
    );
    element.firstChild?.nextSibling?.classList.add("text-white");
  };
  return (
    <div
      id="sidebar"
      className="bg-white text-black h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden"
    >
      <div className="p-2 space-y-3">
        <div className="grid">
          <button
            className={`flex items-center  justify-center  rounded bg-gray-500 dark:bg-gray-800 shadow-lg  shadow-black/20 dark:shadow-black/40 ${
              spanVisible ? " w-12 h-10" : "w-full h-16"
            }`}
            onClick={() => {
              dispatch(rmhubId());
              Navigate("/vendor/vendorhome");
            }}
          >
            <p
              className={`${
                spanVisible ? "text-xs font-semibold" : " text-2xl"
              }  text-white dark:text-gray-500`}
            >
              <h1>Change Hub</h1>
            </p>
          </button>
        </div>
        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          onClick={() =>  Navigate("/vendor/vendordashboard")}
          // onClick={highlightSidebarItem}
        >
          <svg
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            Dashboard
          </span>
        </button>

        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() =>  Navigate("/vendor/vendorprofile")}
          
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Profile
          </span>
        </button>

        <button
          onClick={() => Navigate("/vendor/vendorcars")}
          // onClick={highlightSidebarItem}
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 640 512"
          >
            <path d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c9.7 0 18.9 4.4 25 12l67.2 84H272zm256.2 1L428.2 68c-18.2-22.8-45.8-36-75-36H171.3c-39.3 0-74.6 23.9-89.1 60.3L40.6 196.4C16.8 205.8 0 228.9 0 256V368c0 17.7 14.3 32 32 32H65.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H385.3c7.6 45.4 47.1 80 94.7 80s87.1-34.6 94.7-80H608c17.7 0 32-14.3 32-32V320c0-65.2-48.8-119-111.8-127zM434.7 368a48 48 0 1 1 90.5 32 48 48 0 1 1 -90.5-32zM160 336a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Car Management
          </span>
        </button>

        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() => Navigate("/vendor/vendorbookings")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Bookings Management
          </span>
        </button>

        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={()=>Navigate('/vendor/vendorsalesreport')}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Sales Report
          </span>
        </button>
      </div>
    </div>
  );
};

export default VendorAside;
