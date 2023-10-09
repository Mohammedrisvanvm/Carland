import React,{useState,useEffect} from "react";
import { useNavigate, useParams } from "react-router";
import { IConfirmBook } from "../../../interfaces/bookingConfirmInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import {  bookingconfirmdetails } from "../../../services/apis/userApi/userApi";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";


const BookingConfirmPage: React.FC = () => {
  const Navigate = useNavigate();
const [bookingData,setbookingData]=useState<IConfirmBook|null>(null)
const queryParams = new URLSearchParams(location.search);
const carId: string | null = queryParams.get("carId");
type Params = {
  id?: string;
};
const user=useAppSelector((state)=>state.user)
const { id }: Params = useParams<{ id: string }>();
useEffect(()=>{
  const fetchData = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await bookingconfirmdetails(id);
      
      if (response.data?.bookingConfirmDetails) {
        setbookingData(response.data?.bookingConfirmDetails);
      }
    } catch (error:any) {
      console.log(error);
      
    }
  };
  fetchData();
},[])


  return (
    <>
      <MainHeader />
      <div className="container mt-5 mb-5 overflow-hidden">
        <div className="flex justify-center">
          <div className="w-8/12">
            <div className="card">
              <div className="text-left logo p-2 px-5">
                <img
                  src="/carland-logos_black.png"
                  className="w-12"
                  alt="Logo"
                />
              </div>

              <div className="invoice p-5">
                <h5 className="text-left">Your Booking Confirmed!</h5>

                <span className="font-semibold block text-green-600 mt-4">
                  Hello, {user.userName}
                </span>
                <span>
                  Your Booking has been confirmed and will be available tomorrow
                  in shop!
                </span>

                <div className="payment border-t mt-3 mb-3 border-b table-responsive">
                  <table className="table-auto "></table>
                </div>
                <div>
                  <ul className="sm:flex justify-around">
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>{new Date().toLocaleDateString()}</span>
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
                      <span className="block text-gray-500">paymentDetails</span>
                      <span className="text-green-500">{bookingData?.paymentStatus}</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">payment id</span>
                      <span>{bookingData?.paymentDetails?.razorpay_payment_id}</span>
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
       
                <span>{new Date().toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
       
          <button onClick={()=>Navigate('/profile')} className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
            Back To Booking Details
          </button>
      
      </div>

      <footer
        className="text-center text-white mt-4 "
        style={{ backgroundColor: "#607d8b" }}
      >
        <hr className="border-b border-gray-700" />

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
      </footer>
    </>
  );
};

export default BookingConfirmPage;
