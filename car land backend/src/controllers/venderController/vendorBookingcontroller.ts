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

    const vehicleImageMap: { [key: string]: string } = {};
    vehicles.forEach((vehicle) => {
      vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });

    const bookingDetailsWithImage: IBookWithTimestamps[] =
      bookingDetailsVendor.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
      }));

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

    await bookModel.findByIdAndUpdate(
      { _id: bookingID },
      { $set: { status: "Ongoing" } }
    );

    res.status(200).json({ message: "Request accepted" });
  }
);
export const dropOffAction = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const bookingID: string = req.query.bookingID as string;

    const booking: IBookWithTimestamps = await bookModel.findOneAndUpdate(
      { _id: bookingID },
      { $set: { status: "Completed" } }
    );

    const vehicle: IVehicle = await vehicleModel.findById(booking.vehicleId);

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
    res.status(200).json({ message: "completed" });
  }
);

export const salesReports = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const hubID = req.query.hubID as string;
    const search = req.query.search as string;
    const currentPage = req.query.currentPage as string;

    const skip = (Number(currentPage) - 1) * 5;

    const bookingDetailsVendor: IBookWithTimestamps[] = await bookModel
      .aggregate([
        {
          $match: {
            hubId: hubID,
            status: "Completed",
            vehicleName: {
              $regex: search,
              $options: "i",
            },
          },
        },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(5);
    const vehiclesID: string[] = bookingDetailsVendor.map(
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
      bookingDetailsVendor.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
      }));

    const count: number = await bookModel
      .find({ hubId: { $in: hubID }, status: "Completed" })
      .count();
    interface AggregationResult {
      _id: null;
      totalprice: number;
    }
    const result: AggregationResult[] = await bookModel.aggregate([
      {
        $match: {
          hubId: hubID,
          status: "Completed",
        },
      },
      {
        $group: {
          _id: null,
          totalprice: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.status(200).json({
      salesReport: bookingDetailsWithImage,
      message: "sales Report",
      count,
      salesReportTotal: result[0].totalprice,
    });
  }
);
