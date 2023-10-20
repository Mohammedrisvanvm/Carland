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
import { RazorpayRefund } from "../../interfaces/razorpayInterface";
import { generateId } from "../../helpers/createId";

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
type values = {
  pickUpDate: string;
  dropOffDate: string;
  carId: string;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};
export const razorpayPayment = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { pickUpDate, dropOffDate, carId }: values = req.body.data;
    const startDate: Date = new Date(pickUpDate);
    const endDate: Date = new Date(dropOffDate);
    const days: number = dateCount(startDate, endDate);

    if (!days) {
      throw new Error("date issue");
    }
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
      dropOffDate,
      carId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    }: values = req.body.data;
    const userId: string = req.headers.authorization;

    const hubDetails: Ihub = await hubModel.findOne(
      { vehicles: { $in: carId } },
      { _id: 1, hubName: 1 }
    );
    const startDate: Date = new Date(pickUpDate);
    const endDate: Date = new Date(dropOffDate);
    const days: number = dateCount(startDate, endDate);

    const vehicle: IVehicle = await vehicleModel.findByIdAndUpdate(
      { _id: carId },
      {
        $push: {
          "bookingDates.pickUp": startDate,
          "bookingDates.dropOff": endDate,
        },
      }
    );

    console.log(vehicle);

    let paymentStatus: string = "FullPaid";
    const booking: IBook = await bookModel.create({
      hubId: hubDetails._id,
      vehicleId: carId,
      userId,
      hubName: hubDetails.hubName,
      vehicleName: vehicle.vehicleName,
      bookingStartDate: startDate,
      bookingEndDate: endDate,
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
export const bookingConfirmDetails = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.query);
    const id: string =
      typeof req.query.bookingID === "string" ? req.query.bookingID : "";
    const bookingConfirmDetails: IBookWithTimestamps = await bookModel.findById(
      id
    );

    res.json({ message: "got", bookingConfirmDetails });
  }
);

export const bookingDetails = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.headers.authorization;

    const bookingDetails: IBookWithTimestamps[] = await bookModel
      .find({
        userId,
      })
      .sort({ createdAt: -1 });
    const vehiclesID: string[] = bookingDetails.map((item) => item.vehicleId);
    const hubID: string[] = bookingDetails.map((item) => item.hubId);
    const vehicles: IVehicle[] = await vehicleModel
      .find({
        _id: { $in: vehiclesID },
      })
      .sort();
    // console.log(vehicles);
    const hubs: Ihub[] = await hubModel
      .find({
        _id: { $in: hubID },
      })
      .sort();

    const vehicleImageMap: { [key: string]: string } = {};
    const hubLongitude: { [key: string]: number } = {};
    const hubLatitude: { [key: string]: number } = {};

    vehicles.forEach((vehicle) => {
      vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    // console.log(vehicleImageMap);
    hubs.forEach((hub) => {
      hubLatitude[hub._id] = hub.location.lat;
      hubLongitude[hub._id] = hub.location.lng;
    });
    const bookingDetailsWithImage: IBookWithTimestamps[] = bookingDetails.map(
      (item) => ({
        ...item,
        hubLatitude: hubLatitude[item.hubId],
        hubLongitude: hubLongitude[item.hubId],
        image: vehicleImageMap[item.vehicleId],
      })
    );

    res.json({
      message: "user booking Details",
      bookingDetails: bookingDetailsWithImage,
    });
  }
);
export const pickupReq = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type query = {
      bookingID?: string;
    };
    const { bookingID }: query = req.query;
    await bookModel.updateOne(
      { _id: bookingID },
      { $set: { status: "pickUpreq" } }
    );
    res.json({ message: "pickup Requested" });
  }
);

export const cancelBooking = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type query = {
      bookingID?: string;
    };
    const { bookingID }: query = req.query;
    const booking: IBookWithTimestamps = await bookModel.findById(bookingID);
    razorpay.payments
      .refund(booking.paymentDetails.razorpay_payment_id, {
        amount: `${booking.totalPrice}`,
        speed: "optimum",
        receipt: `${generateId()}`,
      })
      .then((res: RazorpayRefund) => {
        booking.status = "Cancelled";
        booking.paymentStatus = "Refunded";
        booking.refundedDetails = res;
        booking.save();
      })
      .catch((error: any) => {
        console.log(error);
      });
    res.status(200).json({ message: `${bookingID}` });
  }
);

export const dropOffReq = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const bookingID: string = req.query.bookingID as string;
    const booking: IBookWithTimestamps = await bookModel.findOneAndUpdate(
      { _id: bookingID },
      { $set: { status: "dropOffReq" } }
    );
    console.log(booking);

    res.json({ message: "dropOff Requested" });
  }
);
