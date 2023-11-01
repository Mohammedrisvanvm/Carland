"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatUser = exports.getConversation = exports.createConversation = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const conversationSchema_1 = __importDefault(require("../../models/conversationSchema"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.createConversation = (0, express_async_handler_1.default)(async (req, res) => {
    const { hubId, userId } = req.params;
    if (!hubId || !userId) {
        throw new Error("Null body");
    }
    let conversation = await conversationSchema_1.default.findOne({ userId, hubId });
    if (!conversation) {
        conversation = await conversationSchema_1.default.create({ hubId, userId });
    }
    res.status(201).json({ conversation });
});
exports.getConversation = (0, express_async_handler_1.default)(async (req, res) => {
    const hubId = req.params.hubId;
    const conversation = await conversationSchema_1.default.aggregate([
        {
            $match: {
                hubId: new mongoose_1.default.Types.ObjectId(req.params.hubId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userData",
            },
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                hubId: 1,
                createdAt: 1,
                updatedAt: 1,
                userName: "$userData.userName",
                image: "$userData.image",
            },
        },
    ]);
    res.status(200).json({ conversation });
});
exports.getChatUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await userSchema_1.default.findOne({
        _id: req.params.userId,
    });
    res.status(200).json({ user });
});
//# sourceMappingURL=chatController.js.map