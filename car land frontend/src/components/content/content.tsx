import { useNavigate } from "react-router";
import { userGetVehicle } from "../../services/apis/userApi/userApi";
import { Vehicles } from "../../interfaces/vehicleInterface";
import { useEffect, useState, Fragment } from "react";
import { AxiosResponse } from "../../interfaces/axiosinterface";
import { MainHeader } from "../userHeader/MainHeader/MainHeader";

export const Content = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | undefined>([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userGetVehicle();
        console.log(response.data?.vehicles);

        setVehicles(response.data?.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Fragment>
      <MainHeader />
      <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div className="flex justify-center">
            {" "}
            <button
              className="inline-flex items-center justify-between border-r-2 border-gray-300 text-sm w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200  rounded-l-lg shadow-md bg-stone-100 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Place
              <img
                src="https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png"
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
            </button>
            <button
              className="inline-flex items-center text-sm justify-between border-r-2 border-gray-300 w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 shadow-md bg-stone-100	 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Time
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
              </svg>
            </button>
            <button
              className="inline-flex items-center text-sm justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-r-lg shadow-md bg-black focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Get Cars
            </button>
          </div>

          <h2 className="max-w-lg m-12 -mb-8 sm:m-16 font-sans inline-block font-bold leading-none text-center tracking-tight text-gray-900 text-sm sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <span className="relative">The</span>
            </span>{" "}
            Rent a car and explore the city at your own pace
          </h2>
        </div>
        <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2">
          {vehicles
            ? vehicles.map((item) => (
                <button
                  aria-label="View Item"
                  className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={item.singleImage}
                      className="object-cover w-full h-48"
                      alt=""
                    />
                    <div className="flex-grow border border-t-0 rounded-b">
                      <div className="p-5">
                        <h6 className="mb-2 font-bold text-xl ">
                          {item.vehicleName} 2017
                        </h6>
                        <p className="text-xs flex justify-center text-gray-600 font-medium items-center gap-[5px]  ">
                        <span> {item.colour}</span>
                          <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />

                          <span> {item.fuel}</span>
                          <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />

                          <span> {item.numofseats}</span>
                        </p>
                      
                      </div>
                      <hr />
                      <div className="flex justify-around my-4">
                        <p className="text-xs text-gray-600 font-serif font-medium">
                          available at feb 32
                          <br />
                          <span className="text-xl text-black font-semibold font-sans">
                            {" "}
                            ₹864/hr
                          </span>
                        </p>
                        <button className="text-gray-800 bg-stone-200 hover:bg-black hover:text-white focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center ">
                          view
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
                //                 <div className="relative w-[373px] h-[329px] bg-white rounded-[16px] border-r [border-right-style:solid] border-b [border-bottom-style:solid] border-l [border-left-style:solid] border-[#d3d3d3]">
                //                   <div className="inline-flex flex-col h-[160px] items-start absolute top-0 left-px rounded-[16px_16px_0px_0px] [background:linear-gradient(180deg,rgb(128,128,128)_0%,rgb(255,255,255)_25%)]">
                //                     <img src={item.singleImage} alt="" />
                //                   </div>
                //                   <div className="inline-flex items-center justify-between pl-0 pr-[10.1px] pt-px pb-0 absolute top-[255px] left-px border-t [border-top-style:solid] border-[#e0dbdb]">
                //                     <div className="inline-flex flex-col items-start gap-[0.72px] pl-[16px] pr-[15.48px] pt-[15px] pb-[15.94px] relative flex-[0_0_auto]">
                //                       <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-[#7a7777] text-[11px] tracking-[0.24px] leading-[15.7px] whitespace-nowrap">
                //                         Available from 20 September
                //                       </div>
                //                       <div className="relative w-fit [font-family:'IBM_Plex_Sans-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[18px] tracking-[0.16px] leading-[23.9px] whitespace-nowrap">
                //                         ₹336/hr
                //                       </div>
                //                     </div>
                //                     <div className="inline-flex items-center gap-[10px] p-[5px] relative flex-[0_0_auto] bg-[#fbfff5] rounded-[2px] border border-solid border-[#d3d3d3]">
                //                       <img
                //                         className="relative w-[16px] h-[16px]"
                //                         alt="Icons location svg"
                //                         src={item.singleImage}
                //                       />
                //                       <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-[#666666] text-[12px] tracking-[0.40px] leading-[16.0px] whitespace-nowrap">
                //                         Pune
                //                       </div>
                //                     </div>
                //                   </div>
                //                   <div className="absolute w-[371px] h-[95px] top-[160px] left-px">
                //                     <div className="pl-0 pr-[293.05px] py-0 top-[10px] inline-flex items-center gap-[5px] absolute left-[12px]">
                //                     <div className="w-6 h-6 bg-yellow-200">
                //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                //     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L9.67 8.76L3.7 9.27a1 1 0 0 0-.55 1.71l5.17 5.03L5.82 21a1 1 0 0 0 1.45 1.05l6.46-3.3l6.46 3.3a1 1 0 0 0 1.45-1.05l-2.5-6.26l5.17-5.03a1 1 0 0 0-.55-1.71L14.33 8.76L12 2z" />
                //   </svg>
                // </div>
                //                       <div className="relative w-fit [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-black text-[14px] tracking-[0] leading-[normal]">
                //                         4.64
                //                       </div>
                //                     </div>
                //                     <div className="absolute h-[22px] top-[35px] left-[12px] [font-family:'IBM_Plex_Sans-SemiBold',Helvetica] font-semibold text-[#1f1f1f] text-[16px] tracking-[0.16px] leading-[21.3px] whitespace-nowrap">
                //                       Hyundai Creta 2023
                //                     </div>
                //                     <div className="pl-0 pr-[184.36px] py-0 top-[63px] inline-flex items-center gap-[5px] absolute left-[12px]">
                //                       <div className="gap-[5.12px] inline-flex items-center relative flex-[0_0_auto]">
                //                         <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-[#7a7777] text-[12px] tracking-[0.40px] leading-[16.0px] whitespace-nowrap">
                //                           Automatic
                //                         </div>
                //                         <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />
                //                       </div>
                //                       <div className="gap-[4.57px] inline-flex items-center relative flex-[0_0_auto]">
                //                         <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-[#7a7777] text-[12px] tracking-[0.40px] leading-[16.0px] whitespace-nowrap">
                //                           Petrol
                //                         </div>
                //                         <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />
                //                       </div>
                //                       <div className="relative w-fit mt-[-1.00px] [font-family:'IBM_Plex_Sans-Regular',Helvetica] font-normal text-[#7a7777] text-[12px] tracking-[0.40px] leading-[16.0px] whitespace-nowrap">
                //                         5 Seats
                //                       </div>
                //                     </div>
                //                   </div>
                //                 </div>
              ))
            : "hai"}
        </div>
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          >
            Learn more
          </a>
        </div>
      </div>
    </Fragment>
  );
};
