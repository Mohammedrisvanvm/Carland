import dotenv from "dotenv";
import Razorpay from "razorpay";


dotenv.config({path:`../../.env`})
// dotenv.config()
export const razorpay = new Razorpay({
    key_id: process.env.RAZO_KEY_ID ,
    key_secret: process.env.RAZORPAY_SECRET ,
  });