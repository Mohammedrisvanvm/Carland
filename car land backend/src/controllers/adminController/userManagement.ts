import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IUser from "../../interfaces/userInterface";
import userModel from "../../models/userSchema";
export const getAllUser = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users: IUser[] = await userModel.find();
  
    res.status(200).json({users});
  }
);

export const banUser= AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id:string=req.body.value
        console.log(id);
        
      await userModel.findByIdAndUpdate({});
   
      res.status(200).json({message:'success'});
    }
  );
