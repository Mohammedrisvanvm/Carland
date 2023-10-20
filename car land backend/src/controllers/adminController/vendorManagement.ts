import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import VendorModel from "../../models/vendorSchema";
import IVendor from "src/interfaces/vendorInterface";


export const getAllVendors = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const search = req.query.search as string;
      const currentPage = req.query.currentPage as string;
      const skip = (Number(currentPage) - 1) * 5;
      const vendors: IVendor[] = await VendorModel.find({  $or: [
        {
          userName: { $regex: search, $options: "i" },
          email: { $regex: search, $options: "i" }
        
        },
      ]}).skip(skip)
      .limit(5)
      .sort({ createdAt: -1 });
      const count: number = await VendorModel.countDocuments();
  
      res.status(200).json({ vendors,count });
    }
  );
  export const banVendor = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id: string = req.body.value;
  
      const vendor: IVendor | null = await VendorModel.findById(id);
  
      if (vendor) {
        vendor.ban = !vendor.ban;
        await vendor.save();
      }
  
      res.status(200).json({ message: "success" });
    }
  );
  