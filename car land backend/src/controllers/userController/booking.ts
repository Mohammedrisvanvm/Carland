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
export const razorpayPayment = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);

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
      amount: (500*100),
      currency: "INR",
      receipt: generateRandomString(10),
    });


    res.json({ message: "razorpay data", razorpay: response });
  }
);
export const bookCar = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type Idates = {
      pickUpDate: string;
      dropDate: string;
      time: string;
      carId: string;
      payment: string;
    };
    const { pickUpDate, dropDate, time, carId, payment }: Idates =
      req.body.data;
    const userId: string = req.headers.authorization;
    console.log(payment);
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

    let paymentStatus: string;
    if (payment == "paid") {
      paymentStatus = "FullPaid";
    } else {
      paymentStatus = "HalfPaid";
    }

    const order: IBook = await bookModel.create({
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
      totalPrice: days * Number(vehicle.fairPrice),
      days,
    });
    order.save();
    res.json({ order });
  }
);
