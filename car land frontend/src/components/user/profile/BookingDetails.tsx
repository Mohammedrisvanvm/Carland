import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import scroll from "./CustomScrollbar.module.css";
import { bookingdetails } from "../../../services/apis/userApi/userApi";
import {
  IConfirmBook,
  IConfirmBookWithImage,
} from "../../../interfaces/bookingConfirmInterface";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import items from "razorpay/dist/types/items";
type prop = {
  setloading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};
const BookingDetails: React.FC<prop> = ({ loading, setloading }) => {
  const [details, setDetails] = useState<IConfirmBookWithImage[] | null>(null);
  const [singleBooking, setSingleBooking] =
    useState<IConfirmBookWithImage | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await bookingdetails();
      if (response.data?.bookingDetails) {
        setDetails(response.data?.bookingDetails);
      }
    };
    fetchData();
  }, []);
  console.log(singleBooking);

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
          {singleBooking ? (
            <>
              <div className="font-semibold capitalize space-y-4 py-5">
                <p
                  className="flex absolute left-3 text-blue-500  border-2 rounded-3xl hover:cursor-pointer"
                  onClick={() =>setSingleBooking(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M20 11H7.414l3.293-3.293a1 1 0 1 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L7.414 13H20a1 1 0 0 0 0-2z"
                      fill="#888"
                    />
                  </svg>
                </p>
                <div className=" flex justify-center">
                  <img src={singleBooking.image} alt="" />
                </div>
                <p>
                  order id:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc._id}
                  </span>
                </p>

                <p>
                  vehicle Name:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.vehicleName}
                  </span>
                </p>
                <p>
                  Hub Name:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.hubName}
                  </span>
                </p>
                <p>
                  booking Start Date:{" "}
                  <span className="text-green-600">
                    {new Date(
                      singleBooking._doc.bookingStartDate
                    ).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  {" "}
                  booking End Date:{" "}
                  <span className="text-green-600">
                    {new Date(
                      singleBooking._doc.bookingEndDate
                    ).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  car Price:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.carPrice}{" "}
                    <span className="text-gray-500">(rs)</span>
                  </span>
                </p>
                <p>
                  total Price:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.totalPrice}{" "}
                    <span className="text-gray-500">(rs)</span>
                  </span>
                </p>
                <p>
                  days:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.days}
                  </span>
                </p>
                <p>
                  status:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.status}
                  </span>
                </p>
                <p>
                  payment id:{" "}
                  <span className="text-green-600">
                    {singleBooking._doc.paymentDetails?.razorpay_payment_id}
                  </span>
                </p>
                <div className="flex justify-evenly">
                  <button
                    type="button"
                    className="bg-red-600 px-6 rounded-lg py-2 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 px-6 rounded-lg py-2 text-white"
                  >
                    Booking Pdf
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
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
                            <p className="capitalize text-xl">
                              {item._doc.vehicleName}
                            </p>
                            <p>centre:{item._doc.hubName}</p>
                            <p>
                              status:{" "}
                              <span className="text-orange-500">
                                {item._doc.status}
                              </span>
                            </p>
                            <div className="flex justify-evenly items-center mt-4">
                              <button
                                type="button"
                                onClick={() => setSingleBooking(item)}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
