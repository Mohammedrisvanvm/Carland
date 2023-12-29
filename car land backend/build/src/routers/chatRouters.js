"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatController_1 = require("../controllers/chatController/chatController");
const messageContoller_1 = require("../controllers/chatController/messageContoller");
const chatRouter = (0, express_1.Router)();
chatRouter.post('/createconversation/:hubId/:userId', chatController_1.createConversation);
chatRouter.get('/conversations/:hubId', chatController_1.getConversation);
chatRouter.post('/addNewMessage', messageContoller_1.addNewMessage);
chatRouter.get('/messages/:conversationId', messageContoller_1.getMessages);
chatRouter.get('/chatuser/:userId', chatController_1.getChatUser);
exports.default = chatRouter;
//# sourceMappingURL=chatRouters.js.map