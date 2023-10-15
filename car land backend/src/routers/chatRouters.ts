import { Router } from "express";
import {  createConversation, getConversation } from "../controllers/chatController/chatController";
import { addNewMessage, getMessages } from "../controllers/chatController/messageContoller";


const chatRouter=Router()

chatRouter.post('/createconversation',createConversation)
chatRouter.get('/conversation/:userId',getConversation)
chatRouter.post('/newmessage',addNewMessage)
chatRouter.get('/messages/:conversationId',getMessages)
export default chatRouter