import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import VendorModel from "../../models/vendorSchema";
import IVendor from "src/interfaces/vendorInterface";


export const getAllVendors = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const vendors: IVendor[] = await VendorModel.find();
  
      res.status(200).json({ vendors });
    }
  );