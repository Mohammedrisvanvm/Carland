import dotenv from "dotenv";
import Razorpay from "razorpay";


// dotenv.config({path:`../../.env`})
dotenv.config()
console.log(process.env.RAZO_KEY_ID,process.env.RAZORPAY_SECRET)
export const razorpay = new Razorpay({
    key_id: process.env.RAZO_KEY_ID ,
    key_secret: process.env.RAZORPAY_SECRET ,
  });