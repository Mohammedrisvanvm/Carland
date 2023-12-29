"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    conversationId: {
        type: String,
        required: true,
    },
    messageText: {
        type: String,
        required: true,
    },
    receiverId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });
const chatModel = (0, mongoose_1.model)("chat", chatSchema);
exports.default = chatModel;
//# sourceMappingURL=chatSchema.js.map