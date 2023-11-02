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
            .cookie("UserOtpToken", Token, { httpOnly: true, maxAge: 300000, sameSite: "none", })
            .json({ message: "message otp sented" });
    }
});
exports.userOtpverify = (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const UserOtpToken = req.cookies?.UserOtpToken;
        const data = req.body.value;
        if (UserOtpToken) {
            const { payload } = (0, jwtutils_1.verifyJwt)(UserOtpToken);
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
                    sameSite: "none",
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                    sameSite: "none",
                })
                    .json({ user: userExist, accessToken });
            }
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
    if (userExist) {
        if (userExist && (await userExist.matchPassword(data.password))) {
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
                sameSite: "none",
                httpOnly: true,
            })
                .json({ message: "user otp sented" });
        }
        else {
            throw new Error("invalid user name or password");
        }
    }
    else {
        throw new Error("user not exist or banned");
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
                console.log(accessToken, "********************************************************");
                const refreshToken = (0, jwtutils_1.jwtSign)({ id: newUser?._id }, "7d");
                res.status(200).cookie("accessTokenUser", accessToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: "none",
                    httpOnly: true,
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
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
                    sameSite: "none",
                });
                res
                    .cookie("refreshTokenUser", refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    httpOnly: true,
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
        sameSite: "none",
    });
    res
        .cookie("refreshTokenUser", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "none",
    })
        .status(200)
        .json({ message: "logout user" });
});
exports.userCheck = (0, express_async_handler_1.default)(async (req, res) => {
    console.log(req.cookies);
    const accessToken = req.cookies?.accessTokenUser;
    const refreshToken = req.cookies?.refreshTokenUser;
    console.log(accessToken, refreshToken);
    if (!accessToken) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshToken);
        console.log(verifiedJWT);
        if (verifiedJWT) {
            const user = await userSchema_1.default.findOne({ email: verifiedJWT.payload?.email }, { password: 0 });
            if (!user) {
                throw new Error("user not exist");
            }
            const access = await (0, jwtutils_1.jwtSign)({ id: user._id, name: user.userName, email: user.email }, "30s");
            const Ref = await (0, jwtutils_1.jwtSign)({ email: user.email }, "7d");
            res.cookie("accessTokenUser", access, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                secure: true,
                sameSite: "none",
            });
            res
                .cookie("refreshTokenUser", Ref, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
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