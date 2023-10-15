import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";

export const createConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type Ibody = {
      senderId: string;
      receiverId: string;
    };
    const { senderId, receiverId }: Ibody = req.body;
    if (!senderId || !receiverId) {
      throw new Error("null body");
    }
    const newConversation = new conversationModel({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(201).json({ savedConversation });
  }
);

export const getConversation=AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

const conversation=await conversationModel.find({
    members:{$in:[req.params.userId]}
})
res.status(200).json({conversation})
    })


