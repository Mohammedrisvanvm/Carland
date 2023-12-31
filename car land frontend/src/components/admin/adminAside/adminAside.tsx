import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

type Iprop = {
  spanVisible: boolean;
};
const AdminAside: FC<Iprop> = ({ spanVisible }) => {
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
        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          onClick={() => Navigate("/admin/admindashboard")}
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
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() => Navigate("/admin/usermanagement")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            User Management
          </span>
        </button>
        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() => Navigate("/admin/vendormanagement")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 640 512"
          >
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Vendor Management
          </span>
        </button>
        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() => Navigate("/admin/carmanagement")}
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
          onClick={() => Navigate("/admin/hubmanagement")}
        >
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="1em"
            viewBox="0 0 640 512"
          >
            <path d="M36.8 192H603.2c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0H121.7c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224V384v80c0 26.5 21.5 48 48 48H336c26.5 0 48-21.5 48-48V384 224H320V384H128V224H64zm448 0V480c0 17.7 14.3 32 32 32s32-14.3 32-32V224H512z" />
          </svg>
          <span
            className={`font-medium transition-all duration-200 ${
              spanVisible ? "opacity-0" : ""
            }`}
          >
            {" "}
            Hub Management
          </span>
        </button>

        <button
          className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
          // onClick={highlightSidebarItem}
          onClick={() => {
            Navigate("/admin/bookingmanagement");
          }}
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
          onClick={() => Navigate("/admin/salesreport")}
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

export default AdminAside;
