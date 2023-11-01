import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import chatModel from "../../models/chatSchema";

export const addNewMessage = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type Ibody = {
      messageText: string;
      receiverId: string;
      senderId: string;
      conversationId: string;
    };

    const { messageText, senderId, receiverId, conversationId }: Ibody =
      req.body.message;

    const newMessage = new chatModel({
      messageText,
      senderId,
      receiverId,
      conversationId,
    });


    const savedMessage = await newMessage.save();
    res.status(201).json({ savedMessage });
  }
);

export const getMessages = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const messages = await chatModel.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  }
);
