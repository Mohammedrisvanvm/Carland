import Razorpay from "razorpay";

const RAZORPAY_ID=process.env.RAZORPAY_ID 
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID ,
    key_secret: process.env.RAZORPAY_SECRET ,
  });