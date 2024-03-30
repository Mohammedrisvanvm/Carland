"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorLogOut = exports.vendorOtpverify = exports.venderSignUpController = exports.vendorLoginController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vendorSchema_1 = __importDefault(require("../../models/vendorSchema"));
const jwtutils_1 = require("../../utils/jwtUtils/jwtutils");
const twilio_1 = require("../../utils/twilio/twilio");
exports.vendorLoginController = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body.values;
    const venderExist = await vendorSchema_1.default.findOne({
        phoneNumber: data.number,
        ban: false,
    });
    if (venderExist) {
        const response = await (0, twilio_1.sendOtp)(req.body.values.number);
        const Token = (0, jwtutils_1.jwtSign)({ token: response, vendor: req.body.values }, "5min");
        res
            .status(200)
            .cookie("vendorOtpToken", Token, {
            httpOnly: true,
            maxAge: 300000,
        })
            .json({ message: "Otp Token Sented To Number", otp: response });
    }
    else {
        throw new Error("Invalid data or banned");
    }
});
exports.venderSignUpController = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body.values;
    // const data:iSign = req.body
    const venderExist = await vendorSchema_1.default.findOne({
        email: data.email,
    });
    if (venderExist) {
        throw new Error("User Already Exists");
    }
    else {
        const response = await (0, twilio_1.sendOtp)(data.number);
        const Token = (0, jwtutils_1.jwtSign)({ token: response, vendor: data }, "5min");
        res
            .status(200)
            .cookie("vendorOtpToken", Token, {
            httpOnly: true,
            maxAge: 300000,
        })
            .json({ message: "message otp sented" });
    }
});
exports.vendorOtpverify = (0, express_async_handler_1.default)(async (req, res) => {
    console.log(req.cookies);
    const vendorOtpToken = req.cookies?.vendorOtpToken;
    console.log(vendorOtpToken);
    const data = req.body;
    console.log(data);
    if (vendorOtpToken) {
        const { payload } = (0, jwtutils_1.verifyJwt)(vendorOtpToken);
        console.log(payload);
        if (payload?.token == data.value) {
            let vendorExist = await vendorSchema_1.default.findOne({
                phoneNumber: payload.vendor?.number,
            });
            console.log(vendorExist);
            if (!vendorExist) {
                const vendor = await vendorSchema_1.default.create({
                    userName: payload.vendor?.userName,
                    email: payload.vendor?.email,
                    phoneNumber: payload.vendor?.number,
                });
                vendorExist = vendor;
            }
            const accessToken = (0, jwtutils_1.jwtSign)({
                id: vendorExist?._id,
                name: vendorExist?.userName,
                email: vendorExist?.email,
                number: vendorExist?.phoneNumber,
            }, "15min");
            const refreshToken = (0, jwtutils_1.jwtSign)({ number: vendorExist?.phoneNumber }, "7d");
            res.status(200).cookie("accessTokenvendor", accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
            res
                .cookie("refreshTokenvendor", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            })
                .json({ vendor: vendorExist, accessToken });
        }
        else {
            throw new Error("invalid otp");
        }
    }
    else {
        throw new Error("token error");
    }
});
exports.vendorLogOut = (0, express_async_handler_1.default)(async (req, res) => {
    res.cookie("accessTokenvendor", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
    });
    res
        .cookie("refreshTokenvendor", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
    })
        .status(200)
        .json({ message: "logout user" });
});
//# sourceMappingURL=VendorAuthController.js.map