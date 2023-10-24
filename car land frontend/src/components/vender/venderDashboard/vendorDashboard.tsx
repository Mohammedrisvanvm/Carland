import React, { FC } from "react";
import { DistributedChart } from "./apexChart";
type Iprop = {
  sidebarWidth: boolean;
};
const VendorDashboard: FC<Iprop> = ({ sidebarWidth }: Iprop) => {
  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed w-5/6 transition-all duration-200 ease-in-out h-96`}
        style={{ height: "560px" }}
      >
        <div className=" grid w-full gap-5 sm:grid-cols-3 lg:grid-cols-3 px-40 pt-5">
          <div
            className={`${
              true
                ? "enabled:hover:border-gray-400 cursor-pointer"
                : "opacity-50 pointer-events-none"
            } flex justify-center items-center h-40   overflow-hidden bg-contain transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl`}
          >
            <span className="self-center flex flex-col text-white justify-center my-14  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              awesdfggh
              <p className="text-red-600 bg-white ">
                {true ? "" : "(under process)"}
              </p>
            </span>
          </div>
          <div
            className={`${
              true
                ? "enabled:hover:border-gray-400 cursor-pointer"
                : "opacity-50 pointer-events-none"
            } flex justify-center items-center h-40  overflow-hidden bg-contain transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl`}
          >
            <span className="self-center flex flex-col text-black justify-center my-14  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              awesdfggh
              <p className="text-red-600 bg-white ">
                {true ? "under process" : "(under process)"}
              </p>
            </span>
          </div>
          <div
            className={`${
              true
                ? "enabled:hover:border-gray-400 cursor-pointer"
                : "opacity-50 pointer-events-none"
            } flex justify-center items-center h-40    overflow-hidden bg-contain transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl`}
          >
            <span className="self-center flex flex-col text-white justify-center my-14  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              awesdfggh
              <p className="text-red-600 bg-white ">
                {true ? "" : "(under process)"}
              </p>
            </span>
          </div>
        </div>

        <DistributedChart/>
      </div>
    </>
  );
};

export default VendorDashboard;
