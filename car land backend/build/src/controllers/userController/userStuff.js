"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currrentUser = exports.ProfileVerificationData = exports.userprofileData = exports.verifyOtp = exports.verifyNumber = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwtutils_1 = require("../../utils/jwtUtils/jwtutils");
const twilio_1 = require("../../utils/twilio/twilio");
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const fs_1 = __importDefault(require("fs"));
exports.verifyNumber = (0, express_async_handler_1.default)(async (req, res) => {
    const number = req.body.phoneNumber;
    const otp = await (0, twilio_1.sendOtp)(number);
    const Token = (0, jwtutils_1.jwtSign)({ token: otp, number }, "5min");
    res
        .status(200)
        .cookie("verificationToken", Token, { httpOnly: true, maxAge: 300000 })
        .json({ message: "otp sented" });
});
exports.verifyOtp = (0, express_async_handler_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const otp = req.body.otp;
    const verificationToken = req.cookies?.verificationToken;
    const { payload } = (0, jwtutils_1.verifyJwt)(verificationToken);
    if (otp == payload.token) {
        await userSchema_1.default.findByIdAndUpdate({ _id: token }, { $set: { phone_number: payload.number, verified_phonenumber: true } });
        res.status(200).json({ message: "verified" });
    }
    else {
        res.status(401).json({ message: "error otp" });
    }
});
exports.userprofileData = (0, express_async_handler_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const { gender, userName } = req.body;
    if (userName) {
        await userSchema_1.default.findByIdAndUpdate({ _id: token }, { $set: { gender: gender, userName: userName } });
    }
    else {
        await userSchema_1.default.findByIdAndUpdate({ _id: token }, { $set: { gender: gender } });
    }
    res.status(204).json({ message: "updated user profile" });
});
exports.ProfileVerificationData = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.files;
    const Documents = await Promise.all(data.map(async (image) => {
        try {
            const tempFilePath = image.originalname;
            fs_1.default.writeFileSync(tempFilePath, image.buffer);
            const response = await cloudinary_1.default.uploader.upload(tempFilePath, {
                folder: "Documents",
            });
            fs_1.default.unlinkSync(tempFilePath);
            return response.url;
        }
        catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    }));
    const user = req.headers.authorization;
    const currentuser = await userSchema_1.default.findById(user);
    const license = [Documents[0], Documents[1]];
    const adhaar = [Documents[2], Documents[3]];
    if (currentuser) {
        currentuser.profileVerificationRequest = true;
        currentuser.adhaar = adhaar;
        currentuser.license = license;
        await currentuser.save();
    }
    res.json({ message: user });
});
exports.currrentUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = req.headers.authorization;
    const currrentUser = await userSchema_1.default.findById(user);
    res.json({ message: 'current User', user: currrentUser });
});
//# sourceMappingURL=userStuff.js.map