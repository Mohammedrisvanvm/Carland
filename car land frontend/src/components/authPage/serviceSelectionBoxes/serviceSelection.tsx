import React from "react";
import { Vehicles } from "../../../interfaces/vehicleInterface";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { userGetVehicle } from "../../../services/apis/userApi/userApi";
import { useNavigate } from "react-router";
import SkeletonLoader from "../../resumeComponent/SkeletonLoader";

export const ServiceSelection = () => {
  const [vehicles, setVehicles] = React.useState<Vehicles[] | undefined>([]);
  const Navigate = useNavigate();
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userGetVehicle(
          1,
          "",
          "",
          null,
          null,
          ""
        );

        setVehicles(response.data?.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="px-4 pb-14 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-4 ">
          {vehicles?.length != 0 ? (
            vehicles?.map((item) => (
              <button
                aria-label="View Item"
                onClick={() => {
                  Navigate(`/singlecar?carId=${item._id}`);
                }}
                key={item._id}
                className="inline-block mx-2 my-2 overflow-hidden duration-300  transform bg-white rounded shadow-sm hover:-translate-y-2 drop-shadow-md"
              >
                {" "}
                <div className="flex flex-col h-full" >
                  <img
                    src={item.singleImage}
                    className="object-cover w-full h-48"
                    alt=""
                  />
                  <div className="flex-grow border border-t-0 rounded-b">
                    <div className="p-5">
                      <h6 className="mb-2 font-bold text-xl ">
                        {item.vehicleName} {item.year}
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
                          ₹ {item.fairPrice} /day
                        </span>
                      </p>
                      <button className="text-gray-800 bg-stone-200 hover:bg-black hover:text-white focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center ">
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
         <SkeletonLoader count={3}/>
          )}
        </div>
      </div>
    </>
  );
};
