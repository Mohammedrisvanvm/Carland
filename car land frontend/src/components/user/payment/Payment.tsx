import React from "react";
import Razorpay from "razorpay";
import { razorpayApi } from "../../../services/apis/userApi/userApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";

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

const Payment: React.FC = () => {
  async function showRazorpay() {

    const response:AxiosResponse=await razorpayApi('xxx')
    if(response?.data?.razorpay){

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
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
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
      <a onClick={showRazorpay}>pay</a>
    </>
  );
};

export default Payment;
