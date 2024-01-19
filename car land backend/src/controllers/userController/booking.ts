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
import IUser from "../../interfaces/userInterface";
import userModel from "../../models/userSchema";
import { mailServiceConfirmBooking } from "../../utils/nodeMailer/confirmBooking";
import { mailServiceCancelBooking } from "../../utils/nodeMailer/cancelBookingMail";
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID as string,
  key_secret: process.env.RAZORPAY_SECRET as string,
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
  amount: number;
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};
export const razorpayPayment = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { amount }: values = req.body.data;

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
      amount: amount * 100,
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
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    }: values = req.body.data;
    const userId: string = req.headers.authorization;

    const user: IUser = await userModel.findById(userId);
    const hubDetails: Ihub = await hubModel.findOne(
      { vehicles: { $in: carId } },
      { _id: 1, hubName: 1, placeName: 1 }
    );

    const startDate = new Date(pickUpDate);
    startDate.setHours(startDate.getHours() + 5);
    startDate.setMinutes(startDate.getMinutes() + 30);
    const endDate = new Date(dropOffDate);
    endDate.setHours(endDate.getHours() + 5);
    endDate.setMinutes(endDate.getMinutes() + 30);

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



    const paymentStatus: string = "FullPaid";
    const booking: IBook = await bookModel.create({
      hubId: hubDetails._id,
      vehicleId: carId,
      userId,
      hubName: hubDetails.hubName,
      vehicleName: vehicle.vehicleName,
      locationName: hubDetails.placeName,
      bookingStartDate: pickUpDate,
      bookingEndDate: dropOffDate,
      carPrice: vehicle.fairPrice,
      paymentStatus,
      paymentDetails: {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      },
      totalPrice: amount,
      days,
    });
    booking.save();

    mailServiceConfirmBooking(user.email,user.userName,booking)
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


    const data: Iresponse = req.body.data;
    const token = data.razorpay_order_id + "|" + data.razorpay_payment_id;
    const secretKey = process.env.RAZORPAY_SECRET;
    let generated_signature: any = crypto.createHmac("SHA256", secretKey);
    generated_signature.update(token);
    generated_signature = generated_signature.digest("hex");

    if (generated_signature == data.razorpay_signature) {
      res.json({ message: "verified" });
  
    } else {
      res.json({ message: "not verified" });
    }
  }
);
export const bookingConfirmDetails = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
   
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
   
    hubs.forEach((hub) => {
      hubLatitude[hub._id] = hub.location.latitude;
      hubLongitude[hub._id] = hub.location.longitude;
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
      .then(async (res: RazorpayRefund) => {
        booking.status = "Cancelled";
        booking.paymentStatus = "Refunded";
        booking.refundedDetails = res;
        booking.save();
        const vehicle: IVehicle = await vehicleModel.findById(
          booking.vehicleId
        );
        const user:IUser=await userModel.findById(booking._id)
        mailServiceCancelBooking(user.email, user.userName, booking)
        const targetPickUpDate = new Date(booking.bookingStartDate);
        const targetDropOffDate = new Date(booking.bookingEndDate);

        if (
          vehicle.bookingDates.pickUp.some(
            (date) => date.getTime() === booking.bookingStartDate.getTime()
          )
        ) {
          await vehicleModel.findByIdAndUpdate(booking.vehicleId, {
            $pull: {
              "bookingDates.pickUp": targetPickUpDate,
              "bookingDates.dropOff": targetDropOffDate,
            },
          });
        }
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
 

    res.json({ message: "dropOff Requested" });
  }
);
