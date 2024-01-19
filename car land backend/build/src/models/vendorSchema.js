"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VendorSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    renthubs: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId }]
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },
    verified_email: {
        type: Boolean,
    },
    ban: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const VendorModel = (0, mongoose_1.model)('vender', VendorSchema);
exports.default = VendorModel;
//# sourceMappingURL=vendorSchema.js.map