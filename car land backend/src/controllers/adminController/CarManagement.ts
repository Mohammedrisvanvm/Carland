import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const getAllCars = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string;
    const currentPage = req.query.currentPage as string;

    const skip = (Number(currentPage) - 1) * 5;

    const vehicles: IVehicle[] = await vehicleModel
      .find({
        $or: [
          { vehicleName: { $regex: search, $options: "i" } },
          { colour: { $regex: search, $options: "i" } },
        ],
      })
      .skip(skip)
      .limit(5)
      .sort({ createdAt: -1 });

    const count: number = await vehicleModel.countDocuments();
    console.log(count);

    res.json({ vehicles, count });
  }
);
export const banCar = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const car: IVehicle | null = await vehicleModel.findById(id);

    if (car) {
      car.ban = !car.ban;
      car.status = !car.status;
      await car.save();
    }

    res.status(200).json({ message: "success" });
  }
);
export const verifyCar = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const car: IVehicle | null = await vehicleModel.findById(id);

    if (car) {
      car.isVerified = !car.isVerified;
      car.status = !car.status;
      await car.save();
    }

    res.status(200).json({ message: "success" });
  }
);
