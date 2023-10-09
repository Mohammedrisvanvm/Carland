import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scroll from "./CustomScrollbar.module.css";
import { bookingdetails } from "../../../services/apis/userApi/userApi";
import { IConfirmBook, IConfirmBookWithImage } from "../../../interfaces/bookingConfirmInterface";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import items from "razorpay/dist/types/items";
type prop = {
  setloading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};
const BookingDetails: React.FC<prop> = ({ loading, setloading }) => {
  const [details, setDetails] = useState<IConfirmBookWithImage[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await bookingdetails();
      if (response.data?.bookingDetails) {
        setDetails(response.data?.bookingDetails);
      }
    };
    fetchData();
  }, []);
  console.log(details);

  return (
    <>
      <div className="justify-between sm:mt-5 h-96">
        <h5 className=" m-10 text-xl text-center font-bold leading-none sm:text-2xl">
          MY Bookings
        </h5>
        <div
          style={{ height: "565px" }}
          className={`text-center overflow-y-scroll ${scroll.customScrollbar} `}
        >
          {details
            ? details.map((item) => (
                <>
                  <div className="rounded  border-2 mb-3 w-full h-52 p-2 sm:64 sm:p-3">
                    <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
                      <img
                        className=" rounded-2xl w-28 sm:w-48 h-40 object-cover sm:object-cover  "
                        src={item.image}
                        alt=""
                      />

                      <div className=" absolute right-0 sm:right-2 top-2 border-2 text-base font-semibold text-black rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
                        {" "}
                        <p className="capitalize text-xl">{item._doc.vehicleName}</p>
                        <p>centre:{item._doc.hubName}</p>
                        <p>status: <span className="text-orange-500">{item._doc.status}</span></p>
                        <div className="flex justify-evenly items-center mt-4">
                       
                          <button
                            type="button"
                            className="bg-blue-500  text-white rounded font-normal px-10 sm:px-20 py-1"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : "not"}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
