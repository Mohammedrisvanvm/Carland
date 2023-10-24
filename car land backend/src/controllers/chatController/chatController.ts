import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";

export const createConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type IParams = {
      hubId: string;
      bookingId: string;
    };
    console.log(req.params);

    const { hubId, bookingId }: IParams = req.params as IParams;
    if (!hubId || !bookingId) {
      throw new Error("null body");
    }
    let conversation: any = await conversationModel.find({
      members: { $in: [hubId,bookingId] },
    });
    console.log(conversation,1);
    if (conversation.length==0) {
      const newConversation = new conversationModel({
        members: [hubId,bookingId],
      });
      console.log(newConversation);
      
      conversation = await newConversation.save();
    }
    console.log(conversation,2);
    

    res.status(201).json({ conversation });
  }
);

export const getConversation = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.params, 12222222222);

    const conversation: any = await conversationModel.find({
      members: { $in: [req.params.userId] },
    });

    console.log(conversation, 879879);

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
