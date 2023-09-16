import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "src/interfaces/vehicleInterface";
import vehicleModel from "src/models/vehicleSchema";
export const getAllCars = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      
        
        type search={
          search?:string
        }
        const {search}:search=req.query
        const cars: IVehicle[] = await vehicleModel.find({
          vehicleName: new RegExp(search, "i"),
        });
        res.json({ cars });
      }
    );