import React,{useState,useEffect} from "react";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import { useNavigate } from "react-router";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { IConfirmBook } from "../interfaces/bookingConfirmInterface";
import { bookingDetails } from "../services/apis/userApi/userApi";

const content: React.FC = () => {
  const Navigate = useNavigate();
const [bookingData,setbookingData]=useState<IConfirmBook|null>(null)
const queryParams = new URLSearchParams(location.search);
const carId: string | null = queryParams.get("carId");
useEffect(()=>{
  const fetchData = async (): Promise<void> => {
    try {
      const response: AxiosResponse = await bookingDetails(carId);
      console.log(response);
      if (response.data?.bookingconfirm) {
        setbookingData(response.data?.bookingconfirm);
      }
    } catch {}
  };
  fetchData();
},[])
console.log(bookingData);

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
                  Hello, Risvan
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
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                    <li>
                      <span className="block text-gray-500">Order Date</span>
                      <span>qwerty</span>
                    </li>
                  </ul>
                </div>
                <div className="payment border-t mt-3 mb-3 border-b table-responsive">
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
                </div>

                <p>
                  We will be sending a shipping confirmation email when the item
                  is shipped successfully!
                </p>
                <p className="font-semibold mb-0">
                  Thanks for shopping with us!
                </p>
                <span>ESHOP SPORT TEAM</span>
              </div>

              <div className="flex justify-between footer p-3">
                <span>
                  Need Help? Visit our{" "}
                  <a href="#" className="text-blue-600">
                    help center
                  </a>
                </span>
                <span>12 June, 2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <a href="/orders">
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
            Back to Order Details
          </button>
        </a>
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

export default content;
