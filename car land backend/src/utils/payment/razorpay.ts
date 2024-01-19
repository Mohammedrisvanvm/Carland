import Razorpay from "razorpay";


export const razorpay = new Razorpay({
    key_id: process.env.RAZO_KEY_ID ,
    key_secret: process.env.RAZORPAY_SECRET ,
  });