"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
VendorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
VendorSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt_1.default.compare(enteredPassword, this.password);
};
const VendorModel = (0, mongoose_1.model)('vender', VendorSchema);
exports.default = VendorModel;
//# sourceMappingURL=vendorSchema.js.map