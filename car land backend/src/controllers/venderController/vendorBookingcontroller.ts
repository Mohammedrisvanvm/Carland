import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bookModel from "../../models/bookingSchema";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import vehicleModel from "../../models/vehicleSchema";
import IVehicle from "../../interfaces/vehicleInterface";
export const getBookings = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

       type Iquery={
        hubID?:string
        }
const {hubID}:Iquery=req.query
console.log(hubID);

const bookingDetailsVendor:IBookWithTimestamps[]=await bookModel.find({hubId:{$in:hubID}})
const vehiclesID: string[] = bookingDetailsVendor.map((item) => item.vehicleId);

const vehicles: IVehicle[] = await vehicleModel.find({
  _id: { $in: vehiclesID },
});
// console.log(vehicles);
const vehicleImageMap: { [key: string]: string } = {};
vehicles.forEach((vehicle) => {
  vehicleImageMap[vehicle._id] = vehicle.singleImage;
});
// console.log(vehicleImageMap);

const bookingDetailsWithImage: IBookWithTimestamps[] = bookingDetailsVendor.map(
  (item) => ({
    ...item,
    image: vehicleImageMap[item.vehicleId], 
  })
);
console.log(bookingDetailsWithImage);

res.json({message:"unique hub bookingDetails",bookingDetails:bookingDetailsWithImage})
    })