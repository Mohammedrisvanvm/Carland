"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const razorpay_1 = __importDefault(require("razorpay"));
dotenv_1.default.config();
console.log(process.env.RAZO_KEY_ID, process.env.RAZORPAY_SECRET);
exports.razorpay = new razorpay_1.default({
    key_id: process.env.RAZO_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
//# sourceMappingURL=razorpay.js.map