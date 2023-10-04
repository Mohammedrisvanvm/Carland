import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const getAllCars = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type search = {
      search?: string;
    };
    console.log(req.query);
    
    const { search }: search = req.query;
  

    const vehicles: IVehicle[] = await vehicleModel.find({
      vehicleName: new RegExp(search, "i"),
    });
    res.json({ vehicles });
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
      // car.status = !car.status;
      await car.save();
    }

    res.status(200).json({ message: "success" });
  }
);