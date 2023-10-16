import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import conversationModel from "../../models/conversationSchema";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";

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
console.log(req.params,12222222222);

const conversation:any=await conversationModel.find({
    members:{$in:[req.params.userId]}
})
console.log(conversation);

res.status(200).json({conversation})
    })
export const getChatUser=AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {


const user:IUser=await userModel.findOne({
   _id:req.params.userId
})


res.status(200).json({user})
    })


