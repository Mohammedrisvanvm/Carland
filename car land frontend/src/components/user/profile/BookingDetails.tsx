import React from "react";
import scroll from "./CustomScrollbar.module.css";
import {
  bookingdetails,
  cancelBooking,
  dropOffReq,
  pickupReq,
} from "../../../services/apis/userApi/userApi";
import {
  IConfirmBook,
  IConfirmBookWithImage,
} from "../../../interfaces/bookingConfirmInterface";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import Guidance from "./Guidance";
import { toast } from "react-toastify";
import StaticMapRoute from "./StaticMapRoute";
import UserChat from "./UserChat";

const BookingDetails: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [showChat, setShowChat] = React.useState<boolean>(false);
  const [details, setDetails] = React.useState<IConfirmBookWithImage[] | null>(
    null
  );
  const [singleBooking, setSingleBooking] =
    React.useState<IConfirmBookWithImage | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await bookingdetails();
    

      if (response.data?.bookingDetails) {
        setDetails(response.data?.bookingDetails);
      }
    };
    fetchData();
  }, [loading]);

  const handleConfirmation = async (id: string) => {
    const userConfirmed = window.confirm("Do you want to make a request?");

    if (userConfirmed) {
      alert('You clicked "Yes." Requesting...');
      await pickupReq(id);
      toast.success("Requested");
      setLoading(!loading);
      setSingleBooking(null);
    } else {
      alert('You clicked "No." Request canceled.');
    }
  };
  const cancelHandle = async (id: string) => {
    await cancelBooking(id);
    setLoading(!loading);
    setSingleBooking(null);
  };
 
  const dropOffHandler = async (id: string) => {
    await dropOffReq(id);
    setLoading(!loading);
    setSingleBooking(null);
  };
  return (
    <>
      <div className="justify-between sm:mt-5 h-96">
        <h5 className="m-10 text-xl text-center font-bold leading-none sm:text-2xl">
          My Bookings
        </h5>

        <div
          style={{ height: "545px" }}
          className={`text-center overflow-y-scroll  ${scroll.customScrollbar} `}
        >
          {singleBooking ? (
            <>
              <div className="font-semibold capitalize space-y-4 py-5">
                <div className="mb-10 sm:mb-0">
                  {" "}
                  <p
                    className="flex absolute left-6 text-blue-500  border-2 rounded-3xl hover:cursor-pointer"
                    onClick={() => setSingleBooking(null)}
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
                  <p
                    className="flex absolute right-6 text-blue-500 rounded-3xl hover:cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 100 100"
                      fill="#FF0000"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#0084ff"
                        strokeWidth="4"
                        fill="none"
                      />
                      <text x="43" y="65" fontSize="50" fill="#0084ff">
                        !
                      </text>
                    </svg>
                  </p>
                </div>
                <div className=" flex justify-center">
                  <img src={singleBooking.image} alt="" />
                </div>
                <div className=" px-24">
                  <div className="flex flex-col items-start">
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
                    <span className="text-green-600 ">
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
                    Payment Status:{" "}
                    <span className="text-green-600">
                      {singleBooking._doc.paymentStatus}
                    </span>
                  </p>
                  <p>
                    payment id:{" "}
                    <span className="text-green-600">
                      {singleBooking._doc.paymentDetails?.razorpay_payment_id}
                    </span>
                  </p>
                  <p className="  rounded-md mt-2 bg-blue-600 text-white shadow-lg">
                    location:{" "}
                    <span className="text-white ">
                      {singleBooking._doc.locationName}
                    </span>
                  </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-md text-white py-1 px-4"
                >
                  {showChat ? (
                    <UserChat
                      setShowChat={setShowChat}
                      bookingId={singleBooking._doc._id}
                      hubId={singleBooking._doc.hubId}
                    />
                  ) : (
                    <img
                      src="/speech-bubble.gif"
                      alt=""
                      className="h-8 w-8"
                      onClick={() => setShowChat(true)}
                    />
                  )}
                </button>
                <div className="flex justify-center">
                  <div className="h-44 w-72 bg-gray-200 ">
                    <StaticMapRoute
                      latitude={singleBooking.hubLatitude}
                      longitude={singleBooking.hubLongitude}
                    />
                  </div>
                </div>
                <div>
                  {singleBooking._doc.status == "PickUp" ? (
                    <>
                      <div className="flex justify-evenly">
                        <button
                          type="button"
                          onClick={() => cancelHandle(singleBooking._doc._id)}
                          className="bg-red-600 px-6 rounded-lg py-2 text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleConfirmation(singleBooking._doc._id)
                          }
                          className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                          {" "}
                          pickup Request
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {singleBooking._doc.status == "pickUpreq" ? (
                    <>
                      <div className="flex justify-evenly">
                        <button
                          type="button"
                          className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                          {" "}
                          pickup Requested
                        </button>
                        <button
                          type="button"
                          onClick={() => cancelHandle(singleBooking._doc._id)}
                          className="bg-red-600 px-6 rounded-lg py-2 text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {singleBooking._doc.status == "Ongoing" ? (
                    <>
                      <div className="flex justify-evenly">
                        <button
                          type="button"
                          // onClick={() => handleConfirmation(singleBooking._doc._id)}
                          className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                          {" "}
                          extend
                        </button>
                        <button
                          type="button"
                          onClick={() => dropOffHandler(singleBooking._doc._id)}
                          className="bg-green-600 text-white px-5 py-2 rounded"
                        >
                          {" "}
                          dropOffReq?
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {singleBooking._doc.status == "dropOffReq" ? (
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                      {" "}
                      dropOffReq Requested
                    </button>
                  ) : (
                    ""
                  )}
                  {singleBooking._doc.status == "Completed" ? (
                    <button
                      type="button"
                      className="bg-green-600 text-white px-5 py-2 rounded"
                    >
                      {" "}
                      Completed
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-evenly">
                  {singleBooking._doc.status === "Cancelled" ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        disabled
                        className="bg-red-600 px-6 rounded-lg py-2 text-white"
                      >
                        {singleBooking._doc.paymentStatus === "Refunded"
                          ? "Refunded"
                          : "Cancelled"}
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      {singleBooking._doc.status == "Ongoing" || "Completed" ? (
                        ""
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => cancelHandle(singleBooking._doc._id)}
                            className="bg-red-600 px-6 rounded-lg py-2 text-white"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </>
                  )}

                  <button
                    type="button"
                    disabled
                    className="bg-blue-600 px-6 rounded-lg py-2 text-white"
                  >
                    pdf
                  </button>
                </div>
              </div>
              <div>
                {showModal ? (
                  <>
                    <Guidance setShowModal={setShowModal} />
                  </>
                ) : (
                  ""
                )}
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

                          <div className=" absolute right-0 sm:right-2 top-2  text-base font-semibold text-black rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
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
                                className="bg-blue-500  text-white rounded-md font-normal px-8 sm:px-16 py-1"
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
