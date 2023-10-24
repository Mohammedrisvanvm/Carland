import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import bookModel from "../../models/bookingSchema";
export const dashboardDetailsAdmin = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const data: IBookWithTimestamps[] = await bookModel.aggregate([
      {
        $group: {
          _id: null,
          totalAmountCompleted: {
            $sum: {
              $cond: [{ $eq: ["$status", "Completed"] }, "$totalPrice", 0],
            },
          },
          totalOrders: { $sum: 1 },
          totalUsers: { $addToSet: "$userId" },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmountCompleted: 1,
          totalOrders: 1,
          totalUsers: { $size: "$totalUsers" },
        },
      },
    ]);
    console.log(data);

    res.status(200).json({ dashboardDetails: data });
    console.log(data);
  }
);
