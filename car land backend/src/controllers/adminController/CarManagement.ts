import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
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
    export const banCar = AsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
          const id: string = req.body.value;
      
          const car: IVehicle | null = await vehicleModel.findById(id);
      
          if (car) {
            car.ban = !car.ban;
            await car.save();
          }
      
          res.status(200).json({ message: "success" });
        }
      );