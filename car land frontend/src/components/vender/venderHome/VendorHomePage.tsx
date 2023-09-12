import { useEffect, useState } from "react";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import { useNavigate } from "react-router";
import { IHub } from "../../../test/test";
import { getHub } from "../../../services/apis/vendorApi/vendorApi";

const VendorHomePage = () => {
  const [hubs, setHubs] = useState<IHub[]>([]);
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response:any = await getHub();
        console.log(response.data.hubs);

        setHubs(response.data.hubs);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);
  console.log(hubs);
  
  return (
    <div className="bg-gray-200">
      <VendorNavBar />
      <div className="relative px-4 h-screen py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <span className="self-center flex justify-center my-14 text-black text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          HUBS
        </span>
        <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
          <svg
            viewBox="0 0 88 88"
            className="w-full max-w-screen-xl text-indigo-100"
          >
            <circle
              fillOpacity="0.2"
              fill="currentColor"
              cx="44"
              cy="44"
              r="37.5"
            />
            <circle
              fillOpacity="0.3"
              fill="currentColor"
              cx="44"
              cy="44"
              r="29.5"
            />
            <circle
              fillOpacity="0.3"
              fill="currentColor"
              cx="44"
              cy="44"
              r="22.5"
            />
          </svg>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => Navigate("/vendor/addHub")}
            className="flex justify-center items-center h-48 overflow-hidden transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
          >
            <svg
              className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </div>
          {hubs ? hubs.map((item)=>(
       <div
       onClick={() => Navigate("/vendor/addHub")}
       className="flex justify-center items-center h-48 overflow-hidden transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
     >
      {item.hubName}
     </div>
          ) ): null}
               <div className="flex flex-col justify-between h-48 overflow-hidden text-left transition-shadow h-48 duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
              <div className="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
           
            </div>
 
          <div className="flex flex-col h-48 justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl">
            <div className="p-5">
              <div className="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-8 h-8 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
