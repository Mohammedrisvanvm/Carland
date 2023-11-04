"use strict";
// import Twilio from "twilio";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = exports.getotp = void 0;
// const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);
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
        // await client.messages
        //   .create({
        //     body: `otp verification from carland  ${otp}`,
        //     to: `+91${phoneNumber}`,
        //     from: "++1 267 362 9139",
        //   })
        return otp;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
exports.sendOtp = sendOtp;
//# sourceMappingURL=twilio.js.map