import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store/storeHook";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { getBookings } from "../services/apis/vendorApi/vendorApi";
import { IConfirmBookWithImage } from "../interfaces/bookingConfirmInterface";
import { DatePicker, Pagination } from "antd";
import { useNavigate } from "react-router";
const Newadmin = () => {
  const [sidebarWidth, setsidebarWidth] = useState<boolean>(true);
  const [spanVisible, setSpanVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalpage, setTotalpage] = useState<number>(1);
  const [bookings, setBookings] = useState<IConfirmBookWithImage[] | null>(
    null
  );
  const Navigate = useNavigate();
  const id = useAppSelector((state) => state.vendor.hubId);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response: any = [];
        const response: AxiosResponse = await getBookings(id);
        console.log(response);
        if (response.data?.bookingDetails)
          setBookings(response.data.bookingDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  interface SidebarButtonProps {
    label: string;
  }
  //   const SidebarButton: React.FC<SidebarButtonProps> = ({ label }) => {
  //     const [spanVisible, setSpanVisible] = useState(false);

  //     const handleButtonClick = () => {
  //       setSpanVisible(!spanVisible);
  //     }}

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
    <body>
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
              src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
              alt="logo"
              className="h-20 w-28"
            />
          </div>
          <div className="space-x-12">
            <button>
              <img
                onClick={() => Navigate("/vendor/chat")}
                width="25"
                className="text-black"
                src="https://img.icons8.com/color/48/speech-bubble-with-dots.png"
                alt="speech-bubble-with-dots"
              />
            </button>
            <button>
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
          </div>
        </div>
      </nav>

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
                //  dispatch(rmhubId())
                //   Navigate("/vendor/vendorhome")
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
            // onClick={() =>  Navigate("/vendor/vendordashboard")};
            onClick={highlightSidebarItem}
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
            onClick={highlightSidebarItem}
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
            onClick={highlightSidebarItem}
            // onClick={() => Navigate("/admin/usermanagement")}
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
            onClick={highlightSidebarItem}
            // onClick={() => Navigate("/admin/vendormanagement")}
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
            onClick={highlightSidebarItem}
            // onClick={() => Navigate("/admin/carmanagement")}
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
            onClick={highlightSidebarItem}
            // onClick={() => Navigate("/admin/hubmanagement")}
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
            </svg>{" "}
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
            onClick={highlightSidebarItem}
            // onClick={() => Navigate("/admin/bookingmanagement")}
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
            onClick={highlightSidebarItem}
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

      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed w-6/6 transition-all duration-200 ease-in-out h-96`}
        style={{ height: "560px" }}
      >
        <div className="flex relative justify-between  py-5 ">
          {" "}
          <div className="w-10 h-5">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>filter</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              // onChange={(e:ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* <div className="flex items-center w-full mt-2 p-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>{" "}
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 p-4">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Usuarios
            </h2>
            <div
              className="chart-container"
              style={{ position: "absolute", height: "200px", width: "200px" }}
            >
              <canvas id="usersChart"></canvas>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Comercios
            </h2>
            <div
              className="chart-container "
              style={{ position: "absolute", height: "200px", width: "200px" }}
            >
              <canvas id="commercesChart"></canvas>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Autorizaciones Pendientes
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Foto
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Rol
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Foto Perfil"
                      className="rounded-full h-10 w-10"
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    Juan Pérez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    Administrador
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Transacciones
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Fecha
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    Carlos Sánchez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    27/07/2023
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    $1500
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                index
              </th>
              <th scope="col" className="px-6 py-3">
                vehicle image
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Name
              </th>
              <th scope="col" className="px-6 py-3">
                hubName
              </th>

              <th scope="col" className="px-6 py-3">
                bookingStartDate
              </th>

              <th scope="col" className="px-6 py-3">
                bookingEndDate
              </th>

              <th scope="col" className="px-6 py-3">
                days
              </th>
              <th scope="col" className="px-6 py-3">
                totalPrice
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto h-24">
            {bookings
              ? bookings.map((item, index) => (
                  <tr
                    key={item._doc._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 "
                  >
                    <td
                      scope="row"
                      className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="px-3 py-4">
                      <img
                        src={item.image}
                        className="w-16 h-12 object-cover"
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.vehicleName}
                    </td>
                    <td className="px-3 py-4">{item._doc.hubName}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(
                        item._doc.bookingStartDate
                      ).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item._doc.bookingEndDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4">{item._doc.days}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.totalPrice}
                    </td>
                    <td className="px-3 py-4">
                      <button className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                        <span
                          className={`${
                            item._doc.status ? "text-red-600" : "text-blue-600 "
                          }`}
                        >
                          {item._doc.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        className={`  text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5`}
                        // onClick={() => {
                        //   setShowModal(true);
                        //   setshowModalData(item._doc._id);
                        // }}
                        disabled={item._doc.status !== "pickUpreq"}
                      >
                        {" "}
                        action
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div className="text-center mt-10">
          <Pagination
            className="text-black"
            onChange={(page: number, pageSize: number) => setCurrentPage(page)}
            current={currentPage}
            total={totalpage * 10}
          />
        </div>
      </div>
    </body>
  );
};

export default Newadmin;
