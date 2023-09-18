import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
export const userVehicles = AsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
const vehicles:IVehicle[]=await vehicleModel.find()
res.json({vehicles})
    })