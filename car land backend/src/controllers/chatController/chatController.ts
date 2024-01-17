import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";
import mongoose, { ObjectId } from "mongoose";

export const createConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { hubId, userId } = req.params as { hubId: string; userId: string };
    if (!hubId || !userId) {
      throw new Error("Null body");
    }

    let conversation = await conversationModel.findOne({ userId, hubId });
 

    if (!conversation) {
      conversation = await conversationModel.create({ hubId, userId });
    }

    res.status(201).json({ conversation });
  }
);

export const getConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
  
    interface IConversation {
      _id: ObjectId;
      userId: ObjectId;
      hubId: ObjectId;
      createdAt: Date;
      updatedAt: Date;
      userName: string[];
      image: string[];
    }
    const hubId = req.params.hubId as string;

    const allConversation: IConversation[] = await conversationModel.aggregate([
      {
        $match: {
          hubId: new mongoose.Types.ObjectId(req.params.hubId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          hubId: 1,
          createdAt: 1,
          updatedAt: 1,
          userName: "$userData.userName",
          image: "$userData.image",
        },
      },
    ]);
 

    res.status(200).json({ allConversation });
  }
);
export const getChatUser = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user: IUser = await userModel.findOne({
      _id: req.params.userId,
    });

    res.status(200).json({ user });
  }
);
