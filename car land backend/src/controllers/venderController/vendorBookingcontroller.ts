import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bookModel from "../../models/bookingSchema";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import vehicleModel from "../../models/vehicleSchema";
import IVehicle from "../../interfaces/vehicleInterface";
export const getBookings = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string;
    const hubID = req.query.hubID as string;
    const currentPage = req.query.currentPage as string;

    const skip = (Number(currentPage) - 1) * 5;
    console.log(hubID);

    const bookingDetailsVendor: IBookWithTimestamps[] = await bookModel
      .find({
        hubId: { $in: hubID },
        vehicleName: { $regex: search, $options: "i" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(5);
    const vehiclesID: string[] = bookingDetailsVendor.map(
      (item) => item.vehicleId
    );

    const vehicles: IVehicle[] = await vehicleModel.find({
      _id: { $in: vehiclesID },
    });
    // console.log(vehicles);
    const vehicleImageMap: { [key: string]: string } = {};
    vehicles.forEach((vehicle) => {
      vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    // console.log(vehicleImageMap);

    const bookingDetailsWithImage: IBookWithTimestamps[] =
      bookingDetailsVendor.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
      }));
    console.log(bookingDetailsWithImage);
    const count: number = await bookModel
      .find({ hubId: { $in: hubID } })
      .count();

    res.json({
      message: "unique hub bookingDetails",
      bookingDetails: bookingDetailsWithImage,
      count,
    });
  }
);

export const pickUpreqAction = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type query = {
      bookingID?: string;
    };
    const { bookingID }: query = req.query;

    console.log(bookingID);

    await bookModel.findByIdAndUpdate(
      { _id: bookingID },
      { $set: { status: "Ongoing" } }
    );

    res.status(200).json({ message: "Request accepted" });
  }
);
