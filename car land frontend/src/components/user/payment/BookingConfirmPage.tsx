import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { IConfirmBook } from "../../../interfaces/bookingConfirmInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { bookingconfirmdetails } from "../../../services/apis/userApi/userApi";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";

const BookingConfirmPage: React.FC = () => {
  const Navigate = useNavigate();
  const [bookingData, setbookingData] = useState<IConfirmBook | null>(null);
  const queryParams = new URLSearchParams(location.search);
  const carId: string | null = queryParams.get("carId");
  type Params = {
    id?: string;
  };
  const user = useAppSelector((state) => state.user);
  const { id }: Params = useParams<{ id: string }>();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await bookingconfirmdetails(id);

        if (response.data?.bookingConfirmDetails) {
          setbookingData(response.data?.bookingConfirmDetails);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="sm:h-screen h-full">
        <MainHeader />
        <div className="container mt-5 mb-5 ">
          <div className="flex justify-center">
            <div className="w-8/12">
              <p className="flex absolute items-center text-blue-500  border-2 rounded-3xl hover:cursor-pointer p-1" onClick={()=>Navigate('/')}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
              <span className="ml-2 text-black">  back to home</span>
              </p>
              <div className="invoice p-5 mt-10">
                <h5 className="text-left">Your Booking Confirmed!</h5>

                <span className="font-semibold block text-green-600 mt-4">
                  Hello, {user.userName}
                </span>
                <span>
                  Your Booking has been confirmed and will be available on{" "}
                  <span className="text-green-600 font-semibold">
                    {" "}
                    {bookingData
                      ? new Date(bookingData?.bookingStartDate).toDateString()
                      : ""}
                  </span>{" "}
                  in shop!
                </span>

                <div className="payment border-t mt-3 mb-3 border-b table-responsive">
                  <table className="table-auto "></table>
                </div>
                <div>
                  <ul className="sm:flex justify-around">
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>
                        {bookingData
                          ? new Date(
                              bookingData?.createdAt
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order id</span>
                      <span>{bookingData?._id}</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Hub Name</span>
                      <span>{bookingData?.hubName}</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">vehicle Name</span>
                      <span>{bookingData?.vehicleName}</span>
                    </li>
                    {/* <li>
                      <span className="block text-gray-500">pickup time</span>
                      <span>{bookingData?.pickuptime}</span>
                    </li> */}
                    <li>
                      <span className="block text-gray-500">total Price</span>
                      <span>{bookingData?.totalPrice}</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">
                        paymentDetails
                      </span>
                      <span className="text-green-500">
                        {bookingData?.paymentStatus}
                      </span>
                    </li>
                    <li>
                      <span className="block text-gray-500">payment id</span>
                      <span>
                        {bookingData?.paymentDetails?.razorpay_payment_id}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <div className="payment border-t mt-3 mb-3 border-b table-responsive">
                  <table className="table-auto">
                    <tbody>
                      <tr className="">
                        <td className="py-2 ">
                          <span className="block text-gray-500">
                            Product Name
                          </span>
                          <span>2343er</span>
                        </td>

                        <td className="py-2">
                          <span className="block text-gray-500">Price</span>
                          <span>sadsfvdgv</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}

                <p>
                  We will be sending a booking confirmation email when the item
                  is shipped successfully!
                </p>
                <p className="font-semibold mb-0">
                  Thanks for booking with us!
                </p>
                <span>CAR LAND TEAM</span>
              </div>

              <div className="flex justify-between footer p-3">
                <span>
                  Need Help? Visit our{" "}
                  <a href="#" className="text-blue-600">
                    help center
                  </a>
                </span>

                <span>
                  {new Date().toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center ">
            <div
              onClick={() => Navigate("/bookingDetails")}
              className="bg-gray-800 w-44
            hover:bg-gray-700 text-white  font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              To Booking Details
            </div>
          </div>
        </div>

        <div
          className="text-center sm:absolute bottom-0  w-full text-white sm:mt-24 "
          style={{ backgroundColor: "#607d8b" }}
        >
          <hr className="border-2 border-gray-700" />

          <div className="container" style={{ height: "50" }}>
            <section className="mb-3">
              <a
                href="#"
                className="btn btn-floating btn-lg text-white me-3"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="btn btn-floating btn-lg text-white me-3"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="btn btn-floating btn-lg text-white me-3"
                role="button"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="btn btn-floating btn-lg text-white me-3"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="btn btn-floating btn-lg text-white"
                role="button"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </section>
          </div>

          <div
            className="text-center p-3 "
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: " #e0e0e0" }}
          >
            © 2023 Copyright:{" "}
            <button onClick={() => Navigate("/")} className="text-white">
              carland.com
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmPage;
