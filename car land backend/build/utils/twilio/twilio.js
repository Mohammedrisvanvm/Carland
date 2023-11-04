"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.getotp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);
function getotp() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getotp = getotp;
const sendOtp = async (phoneNumber) => {
    // console.log(client);
    try {
        const otp = getotp();
        await client.messages
            .create({
            body: `otp verification from carland  ${otp}`,
            to: `+91${phoneNumber}`,
            from: "++1 267 362 9139",
        });
        return otp;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.sendOtp = sendOtp;
//# sourceMappingURL=twilio.js.map