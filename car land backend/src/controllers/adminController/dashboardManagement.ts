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

          totalPickup: {
            $sum: { $cond: [{ $eq: ["$status", "PickUp"] }, 1, 0] },
          },
          totalPickUpreq: {
            $sum: { $cond: [{ $eq: ["$status", "pickUpreq"] }, 1, 0] },
          },
          totalOngoing: {
            $sum: { $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0] },
          },
          totalDropOffReq: {
            $sum: { $cond: [{ $eq: ["$status", "dropOffReq"] }, 1, 0] },
          },
          totalCompleted: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
          totalCancelled: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmountCompleted: 1,
          totalOrders: 1,
          totalUsers: { $size: "$totalUsers" },
          totalCancelled: 1,
          totalOngoing: 1,
          totalPickup: 1,
          totalDropOffReq: 1,
          totalPickUpreq: 1,
          totalCompleted: 1,
        },
      },
    ]);


    const resultArray: number[] = [];

    if (data.length > 0) {
      const firstResult: any = data[0];

      for (const key in firstResult) {
        if (
          typeof firstResult[key] === "number" &&
          key != "totalAmountCompleted" &&
          key != "totalOrders" &&
          key != "totalUsers"
        ) {
          resultArray.push(firstResult[key]);
        }
      }
    }

    res.status(200).json({
      message: "dashboard Details Admin",
      dashboardDetails: { data, resultArray },
    });
  }
);
