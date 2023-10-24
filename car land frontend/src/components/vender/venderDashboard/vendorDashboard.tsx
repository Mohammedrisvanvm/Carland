import React, { FC } from "react";

import { useAppSelector } from "../../../redux/store/storeHook";
import { dashboardDetails } from "../../../services/apis/vendorApi/vendorApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { DistributedChart } from "../../../hook/apexChart";
type Iprop = {
  sidebarWidth: boolean;
};
const VendorDashboard: FC<Iprop> = ({ sidebarWidth }: Iprop) => {
  const hubId = useAppSelector((state) => state.vendor.hubId);
  const [users,setUsers]=React.useState<number>(0)
  const [totalOrders,setTotalOrders]=React.useState<number>(0)
  const [revenue,setRevenue]=React.useState<number>(0)
  console.log(hubId);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response:AxiosResponse = await dashboardDetails(hubId);
        console.log(response.data?.dashboardDetails);
        if(response.data?.dashboardDetails){
          setUsers(response.data.dashboardDetails.data[0].totalUsers)
          setTotalOrders(response.data.dashboardDetails.data[0].totalOrders)
          setRevenue(response.data.dashboardDetails.data[0].totalAmountCompleted)
        }
      } catch (error:any) {

        console.log(error);
        
      }
    };
    fetchData();
  }, []);
  const categories:string[]=["bookings", "ongoing", "completed", "cancelled"]
 const data : number[]=[30, 40, 45, 50, ]
  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16"
        } bg-gray-100 px-6  w-5/6 transition-all duration-200 ease-in-out  p-5`}
      >
        <div className=" grid w-full gap-5 sm:grid-cols-3 lg:grid-cols-3 px-40 pt-5">
          <div
            className={`${
              true
                ? "enabled:hover:border-gray-400 cursor-pointer"
                : "opacity-50 pointer-events-none"
            } flex justify-center items-center h-40  overflow-hidden bg-contain transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl`}
          >
            <span className="self-center flex flex-col text-black justify-center my-14  text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
              totalOrders
              <p className="text-red-600 bg-white flex justify-center">
               {totalOrders}
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
              users
              <p className="text-red-600 bg-white flex justify-center">
                {users}
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
            Revenue
              <p className="text-red-600 bg-white flex justify-center">
              {revenue}
              </p>
            </span>
          </div>
        </div>

        <DistributedChart categories={categories}  data={data}/>
      </div>
    </>
  );
};

export default VendorDashboard;
