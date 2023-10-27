import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";
import { Iconversation } from "../../interfaces/chatInterface";

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

    console.log(conversation, 2);

    res.status(201).json({ conversation });
  }
);

export const getConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.params, 12222222222);
    type Iconversation = {
      _id: string;
      members: string[];
      createdAt: Date;
      updatedAt: Date;
    };

    const conversation: Iconversation[] = await conversationModel.find({
      hubId: req.params.hubId,
    });
    console.log(conversation);
    conversation.map(async (item) => {});

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
