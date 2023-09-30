import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const userVehicles = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pageNumber: number = Number(req.query.currentPage);
    type search = {
      search?: string;
      filter?: string;
    };

    const { search, filter }: search = req.query;

    const query: any = { isVerified: true };

    if (search) {
      query.vehicleName = new RegExp(search, "i");
    }
    if (filter) {
      query.fuel = new RegExp(filter, "i");
    }

    const perPage = 4;
    const skip = (pageNumber - 1) * perPage;

    const vehicles: IVehicle[] = await vehicleModel
      .find(query)
      .skip(skip)
      .limit(perPage);

    const count: number = await vehicleModel.countDocuments(query);
    res.json({ vehicles, count });
  }
);
export const singleCar = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    
    const id: string = typeof req.query.id === 'string' ? req.query.id : '';
    const vehicle: IVehicle = await vehicleModel.findById(id);
  
    res.json({ vehicle });
  }
);
