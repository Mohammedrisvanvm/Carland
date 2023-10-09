import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import bookModel from "../../models/bookingSchema";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const allBookings = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    const bookingDetailsAdmin:IBookWithTimestamps[]=await bookModel.find()
    console.log(bookingDetailsAdmin);
    const vehiclesID: string[] = bookingDetailsAdmin.map((item) => item.vehicleId);

const vehicles: IVehicle[] = await vehicleModel.find({
  _id: { $in: vehiclesID },
});

const vehicleImageMap: { [key: string]: string } = {};
vehicles.forEach((vehicle) => {
  vehicleImageMap[vehicle._id] = vehicle.singleImage;
});


const bookingDetailsWithImage: IBookWithTimestamps[] = bookingDetailsAdmin.map(
  (item) => ({
    ...item,
    image: vehicleImageMap[item.vehicleId], 
  })
);

    res.json({ message: "booking Details Admin" ,bookingDetails:bookingDetailsWithImage });
  }
);
