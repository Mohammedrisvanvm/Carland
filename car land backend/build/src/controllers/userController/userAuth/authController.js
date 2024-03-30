"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCheck = exports.userLogoutController = exports.userGoogleAuth = exports.userLoginController = exports.userOtpverify = exports.userSignUpController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../../../models/userSchema"));
const jwtutils_1 = require("../../../utils/jwtUtils/jwtutils");
const axios_1 = __importDefault(require("axios"));
const otp_1 = require("../../../utils/nodeMailer/otp");
const twilio_1 = require("../../../utils/twilio/twilio");
exports.userSignUpController = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body.value;
    // const data: iSign = req.body;
    const userExist = await userSchema_1.default.findOne({
        email: data.email,
    });
    if (userExist) {
        throw new Error("User Already Exists");
    }
    else {
        const otp = (0, twilio_1.getotp)();
        (0, otp_1.MailServiceOtp)(data.email, otp);
        const Token = (0, jwtutils_1.jwtSign)({ token: otp, user: data }, "5min");
        res
            .status(200)
            .cookie("UserOtpToken", Token, { httpOnly: true, maxAge: 300000 })
            .json({ message: "message otp sented" });
    }
});
exports.userOtpverify = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const userOtpToken = req.cookies?.UserOtpToken;
        const data = req.body.value;
        if (userOtpToken) {
            const { payload } = (0, jwtutils_1.verifyJwt)(userOtpToken);
            if (payload?.token == data) {
                let userExist = await userSchema_1.default.findOne({
                    email: payload.user?.email,
                });
                if (!userExist) {
                    const user = await userSchema_1.default.create({
                        userName: payload.user?.userName,
                        email: payload.user?.email,
                        phoneNumber: payload.user?.number,
                        password: payload.user?.password,
                    });
                    userExist = user;
                }
                const accessToken = (0, jwtutils_1.jwtSign)({
                    user: {
                        id: userExist?._id,
                        name: userExist?.userName,
                        email: userExist?.email,
                    },
                }, "15min");
                const refreshToken = (0, jwtutils_1.jwtSign)({ id: userExist?._id }, "7d");
                res.status(200).cookie("accessTokenUser", accessToken, {
                    maxAge: 900000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                    .json({ user: userExist, accessToken });
            }
            else {
                throw new Error("invalid token");
            }
        }
        else {
            throw new Error("token not there");
        }
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.userLoginController = (0, express_async_handler_1.default)(async (req, res) => {
    // const data: data = req.body;
    const data = req.body.value;
    const userExist = await userSchema_1.default.findOne({
        email: data.email,
        ban: false,
    });
    if (!userExist) {
        throw new Error("user not exist or banned");
    }
    else {
        if (userExist.password) {
            await userExist.matchPassword(data.password);
        }
        if (userExist) {
            const token = (0, twilio_1.getotp)();
            const userOtpToken = (0, jwtutils_1.jwtSign)({
                token: token,
                user: {
                    email: userExist.email,
                },
            }, "15min");
            (0, otp_1.MailServiceOtp)(userExist.email, token);
            res
                .status(200)
                .cookie("UserOtpToken", userOtpToken, {
                maxAge: 300000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
                .json({ message: "user otp sented" });
        }
        else {
            throw new Error("invalid user name or password");
        }
    }
});
exports.userGoogleAuth = (0, express_async_handler_1.default)(async (req, res) => {
    const Token = req.body.value;
    if (Token) {
        axios_1.default
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token.access_token}`)
            .then(async (response) => {
            const olduser = await userSchema_1.default.findOne({
                email: response.data?.email,
            });
            if (olduser) {
                await userSchema_1.default.findByIdAndUpdate(olduser._id, {
                    $set: {
                        email: response.data?.email,
                        googleId: response.data?.id,
                        image: response.data?.picture,
                        verified_email: response.data?.verified_email,
                    },
                });
                const newUser = await userSchema_1.default.findOne({
                    email: response.data?.email,
                });
                const accessToken = (0, jwtutils_1.jwtSign)({
                    user: {
                        id: newUser?._id,
                        name: newUser?.userName,
                        email: newUser?.email,
                    },
                }, "15min");
                const refreshToken = (0, jwtutils_1.jwtSign)({ id: newUser?._id }, "7d");
                res.status(200).cookie("accessTokenUser", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    secure: true,
                    sameSite: "none",
                    httpOnly: true,
                })
                    .json({
                    user: newUser,
                    accessToken,
                    message: `welcome back ${newUser?.userName}`,
                });
            }
            else {
                const user = await userSchema_1.default.create({
                    userName: response.data?.name,
                    email: response.data?.email,
                    googleId: response.data?.id,
                    image: response.data?.picture,
                    verified_email: response.data?.verified_email,
                });
                const accessToken = (0, jwtutils_1.jwtSign)({
                    user: { id: user._id, name: user.userName, email: user.email },
                }, "15min");
                const refreshToken = (0, jwtutils_1.jwtSign)({ email: user.email }, "7d");
                res.status(200).cookie("accessTokenUser", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                })
                    .json({ user, accessToken, message: "created" });
            }
        });
    }
});
exports.userLogoutController = (0, express_async_handler_1.default)(async (req, res) => {
    res.cookie("accessTokenUser", "", {
        httpOnly: true,
        maxAge: 0,
        secure: true,
    });
    res
        .cookie("refreshTokenUser", "", {
        httpOnly: true,
        maxAge: 0,
        secure: true,
    })
        .status(200)
        .json({ message: "logout user" });
});
exports.userCheck = (0, express_async_handler_1.default)(async (req, res) => {
    const accessToken = req.cookies?.accessTokenUser;
    const refreshToken = req.cookies?.refreshTokenUser;
    if (!accessToken) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshToken);
        if (verifiedJWT) {
            const user = await userSchema_1.default.findOne({ email: verifiedJWT.payload?.email }, { password: 0 });
            if (!user) {
                throw new Error("user not exist");
            }
            const access = (0, jwtutils_1.jwtSign)({ id: user._id, name: user.userName, email: user.email }, "30s");
            const Ref = (0, jwtutils_1.jwtSign)({ email: user.email }, "7d");
            res.cookie("accessTokenUser", access, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 8 * 1000 * 60,
            });
            res
                .cookie("refreshTokenUser", Ref, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 8 * 1000 * 60,
            })
                .json({ user });
        }
        else {
            throw new Error("token is not avialable");
        }
    }
    else {
        const verify = (0, jwtutils_1.verifyJwt)(refreshToken);
        const data = await userSchema_1.default.findOne({ email: verify.payload?.email }, { password: 0 });
        res.json({ user: data, message: "token available" });
    }
});
//# sourceMappingURL=authController.js.map