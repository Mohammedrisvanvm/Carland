import { Router } from "express";
import {  createConversation, getChatUser, getConversation } from "../controllers/chatController/chatController";
import { addNewMessage, getMessages } from "../controllers/chatController/messageContoller";


const chatRouter=Router()

chatRouter.post('/createconversation',createConversation)
chatRouter.get('/conversations/:userId',getConversation)
chatRouter.post('/newmessage',addNewMessage)
chatRouter.get('/messages/:conversationId',getMessages)
chatRouter.get('/chatuser/:userId',getChatUser)
export default chatRouter