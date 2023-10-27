import { Router } from "express";
import {  createConversation, getChatUser, getConversation } from "../controllers/chatController/chatController";
import { addNewMessage, getMessages } from "../controllers/chatController/messageContoller";


const chatRouter=Router()

chatRouter.post('/createconversation/:hubId/:userId',createConversation)
chatRouter.get('/conversations/:hubId',getConversation)
chatRouter.post('/addNewMessage',addNewMessage)
chatRouter.get('/messages/:conversationId',getMessages)
chatRouter.get('/chatuser/:userId',getChatUser)
export default chatRouter