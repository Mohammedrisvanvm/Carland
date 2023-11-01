"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hubSchema = new mongoose_1.Schema({
    hubName: {
        type: String,
        required: true,
    },
    placeName: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    ban: {
        type: Boolean,
        default: false,
    },
    location: {
        type: Object,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    validityDate: {
        type: Date,
        required: true,
    },
    vehicles: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId }],
    },
    license: {
        type: String,
        required: true,
    },
    hubImage: {
        // url: { type: String },
        // publicid: { type: String },
        type: String,
        required: true,
    },
    hubMultiImage: {
        type: (Array),
        required: true,
    },
}, { timestamps: true });
const hubModel = (0, mongoose_1.model)("hub", hubSchema);
exports.default = hubModel;
//# sourceMappingURL=hubSchema.js.map