import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IUser from "../../interfaces/userInterface";
import userModel from "../../models/userSchema";
export const getAllUser = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const search = req.query.search as string;
    const currentPage = req.query.currentPage as string;
    const skip = (Number(currentPage) - 1) * 5;
    const users: IUser[] = await userModel.find({  $or: [
      {
        userName: { $regex: search, $options: "i" },
        email: { $regex: search, $options: "i" }
      
      },
    ]}).skip(skip)
    .limit(5)
    .sort({ createdAt: -1 });
    const count: number = await userModel.countDocuments();
    res.status(200).json({ users ,count});
  }
);

export const banUser = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const user: IUser | null = await userModel.findById(id);

    if (user) {
      user.ban = !user.ban;
      await user.save();
    }

    res.status(200).json({ message: "success" });
  }
);
export const ProfileVerification = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const user: IUser | null = await userModel.findById(id);

    if (user) {
      user.verifiedProfile = !user.verifiedProfile;
      user.profileVerificationRequest = false;
      await user.save();
    }

    res.status(200).json({ message: "success" });
  }
);
