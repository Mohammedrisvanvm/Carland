import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const userVehicles = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
   
    const pageNumber: number = Number(req.query.currentPage);

    const vehicles: IVehicle[] = await vehicleModel
      .find()
      .skip((pageNumber - 1) * 4)
      .limit(4);
    const count: number = await vehicleModel.find().count();
    console.log(vehicles, "vehicles");

    res.json({ vehicles, count });
  }
);
