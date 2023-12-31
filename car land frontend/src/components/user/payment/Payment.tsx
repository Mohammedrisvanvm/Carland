import React from "react";

import {
  bookingCar,
  razorpayApi,
  verifyRazorpayPayment,
} from "../../../services/apis/userApi/userApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";

import { useNavigate } from "react-router";

const loadRazorpay = (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
type Ivalues = {
  value: {
    pickUpDate: string;
    dropOffDate: string;
    carId: string | null;
    amount:number
    razorpay_signature?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
  };
};
type Iresponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
const Payment: React.FC<Ivalues> = ({ value }: Ivalues) => {

  const Navigate = useNavigate();
  async function showRazorpay() {
    const response: AxiosResponse = await razorpayApi(value);
    if (response?.data?.razorpay) {
      var result = response?.data?.razorpay;
   

      const res = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        alert("sdk is not working");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_ID,
        amount: result.amount,
        currency: result.currency,
        name: "Car Land",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: result.id,
        handler: async function (response: Iresponse) {
          value.razorpay_payment_id = response.razorpay_payment_id;
          value.razorpay_order_id = response.razorpay_order_id;
          value.razorpay_signature = response.razorpay_signature;
          await verifyRazorpayPayment(response).then(
            async (res: AxiosResponse) => {
              if (res.data?.message == "verified") {
                const confirmorder: AxiosResponse = await bookingCar(value);

                if (confirmorder.data?.id)
                  Navigate(`/BookingConfirm/${confirmorder.data?.id}`);
              } else {
                console.log("false");
              }
            }
          );
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const _window = window as any;
      var rzp1 = new _window.Razorpay(options);
      rzp1.open();
    }
  }

  return (
    <>
      <a
        onClick={showRazorpay}
        className="inline-flex mt-10 capitalize items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none"
      >
       click to pay
      </a>
    </>
  );
};

export default Payment;
