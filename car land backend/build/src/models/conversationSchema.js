"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    hubId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, { timestamps: true });
const conversationModel = (0, mongoose_1.model)("conversation", conversationSchema);
exports.default = conversationModel;
//# sourceMappingURL=conversationSchema.js.map