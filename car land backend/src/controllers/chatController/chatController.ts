import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";
import { Iconversation } from "../../interfaces/chatInterface";
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

    const user = await userModel.findById(conversation[0].userId);
    const withUser = await conversationModel.aggregate([
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
          userData: 1,
        },
      },
    ]);
    console.log(withUser, user, 12);

    res.status(201).json({ conversation });
  }
);

export const getConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.params, 12222222222);
    interface IConversation {
      _id: ObjectId ; 
      userId: ObjectId;
      hubId: ObjectId;
      createdAt: Date;
      updatedAt: Date;
      userName: string[];
      image: string[];
    }
    

    // const conversation: Iconversation[] = await conversationModel.find({
    //   hubId: req.params.hubId,
    // });
    const conversation:IConversation[] = await conversationModel.aggregate([
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
          createdAt:1,
          updatedAt:1,
          userName: "$userData.userName",
          image: "$userData.image",
        },
      },
    ]);
 


    res.status(200).json({ conversation });
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
