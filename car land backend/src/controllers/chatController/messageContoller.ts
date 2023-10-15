
import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import chatModel from "../../models/chatSchema";
import conversationModel from "../../models/conversationSchema";

export const addNewMessage = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
type Ibody={
    messageText:string,
    recieverId:string,
    senderId:string,
    conversationId:string
}
    const {messageText,senderId,recieverId,conversationId}:Ibody=req.body
const newMessage= new chatModel({
    messageText,
    senderId,
    recieverId,
    conversationId
})
const savedMessage=await newMessage.save()
res.status(201).json({savedMessage})
  })

  export const getMessages = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
const messages=await chatModel.find({conversationId:req.params.conversationId})
res.status(200).json(messages)
    })
