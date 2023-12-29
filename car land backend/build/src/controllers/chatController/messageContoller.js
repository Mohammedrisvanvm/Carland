"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.addNewMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chatSchema_1 = __importDefault(require("../../models/chatSchema"));
exports.addNewMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { messageText, senderId, receiverId, conversationId } = req.body.message;
    const newMessage = new chatSchema_1.default({
        messageText,
        senderId,
        receiverId,
        conversationId,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json({ savedMessage });
});
exports.getMessages = (0, express_async_handler_1.default)(async (req, res) => {
    const messages = await chatSchema_1.default.find({
        conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
});
//# sourceMappingURL=messageContoller.js.map