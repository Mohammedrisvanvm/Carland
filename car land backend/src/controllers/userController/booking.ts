import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IBook from "../../interfaces/bookingInterface";
import bookModel from "../../models/bookingSchema";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import { dateCount } from "../../helpers/dateCount";
import Razorpay from "razorpay";
import crypto from "crypto";
import IBookWithTimestamps from "../../interfaces/bookingInterface";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
type Idates = {
  pickUpDate: string;
  dropDate: string;
  time: string;
  carId: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};
export const razorpayPayment = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const { pickUpDate, dropDate, carId }: Idates = req.body.data;
    const days: number = dateCount(pickUpDate, dropDate);
    const vehicle: IVehicle = await vehicleModel.findById(carId);
    type Irazresponse = {
      id: string;
      entity: string;
      amount: number | string;
      amount_paid: number;
      amount_due: number;
      currency: string;
      receipt?: string;
      status: string;
      attempts: number;
      created_at: number;
    };
    const response: Irazresponse = await razorpay.orders.create({
      amount: Number(vehicle.fairPrice) * days * 100,
      currency: "INR",
      receipt: generateRandomString(10),
    });

    res.json({ message: "razorpay data", razorpay: response });
  }
);
export const bookCar = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      pickUpDate,
      dropDate,
      time,
      carId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    }: Idates = req.body.data;
    const userId: string = req.headers.authorization;

    const hubDetails: Ihub = await hubModel.findOne(
      { vehicles: { $in: carId } },
      { _id: 1, hubName: 1 }
    );

    const days: number = dateCount(pickUpDate, dropDate);

    const vehicle: IVehicle = await vehicleModel.findById(carId);
    if (vehicle) {
      vehicle.status = !vehicle.status;
    }
    vehicle.save();

    console.log(days, vehicle, hubDetails, userId, req.body);

    let paymentStatus: string = "FullPaid";
    const booking: IBook = await bookModel.create({
      hubId: hubDetails._id,
      vehicleId: carId,
      userId,
      hubName: hubDetails.hubName,
      vehicleName: vehicle.vehicleName,
      bookingStartDate: pickUpDate,
      bookingEndDate: dropDate,
      pickuptime: time,
      carPrice: vehicle.fairPrice,
      paymentStatus,
      paymentDetails: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
      totalPrice: days * Number(vehicle.fairPrice),
      days,
    });
    booking.save();
    res.json({ id: booking._id });
  }
);
type Iresponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
export const verifyRazorpayPayment = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body, 123);

    const data: Iresponse = req.body.data;
    const token = data.razorpay_order_id + "|" + data.razorpay_payment_id;
    const secretKey = process.env.RAZORPAY_SECRET;
    let generated_signature: any = crypto.createHmac("SHA256", secretKey);
    generated_signature.update(token);
    generated_signature = generated_signature.digest("hex");

    if (generated_signature == data.razorpay_signature) {
      res.json({ message: "verified" });
      console.log(" payment is successful");
    } else {
      res.json({ message: "not verified" });
    }
  }
);
export const bookingDetails = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        console.log(req.query);
        const id: string = typeof req.query.bookingID === 'string' ? req.query.bookingID : '';
        const bookingDetails:IBookWithTimestamps=await bookModel.findById(id)
        console.log(id);
        
        res.json({message:"g",bookingDetails})
    })