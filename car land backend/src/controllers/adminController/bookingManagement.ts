import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import bookModel from "../../models/bookingSchema";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const allBookings = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string;
    const currentPage = req.query.currentPage as string;

    const skip = (Number(currentPage) - 1) * 5;
    const bookingDetailsAdmin: IBookWithTimestamps[] = await bookModel
      .find({
        $or: [
          { vehicleName: { $regex: search, $options: "i" } },
          { hubName: { $regex: search, $options: "i" } },
        ],
      })
      .skip(skip).limit(5).sort({createdAt:-1})

    const vehiclesID: string[] = bookingDetailsAdmin.map(
      (item) => item.vehicleId
    );

    const vehicles: IVehicle[] = await vehicleModel.find({
      _id: { $in: vehiclesID },
    });

    const vehicleImageMap: { [key: string]: string } = {};
    vehicles.forEach((vehicle) => {
      vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });

    const bookingDetailsWithImage: IBookWithTimestamps[] =
      bookingDetailsAdmin.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
      }));
      const count: number = bookingDetailsWithImage.length<=4 ? bookingDetailsWithImage.length: await bookModel.countDocuments();
 
      
    res.json({
      message: "booking Details Admin",
      bookingDetails: bookingDetailsWithImage,
      count
    });
  }
);
