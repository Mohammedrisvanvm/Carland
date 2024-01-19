"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthenticate = void 0;
const jwtutils_1 = require("../../utils/jwtUtils/jwtutils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
exports.userAuthenticate = (0, express_async_handler_1.default)(async (req, res, next) => {
    console.log(req.headers.authorization);
    const accessTokenusertoken = req.cookies.accessTokenUser;
    const refreshTokenuser = req.cookies.refreshTokenUser;
    console.log(refreshTokenuser, accessTokenusertoken);
    if (!accessTokenusertoken && !refreshTokenuser) {
        throw new Error("User Access Denied");
    }
    console.log(accessTokenusertoken);
    if (accessTokenusertoken) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshTokenuser);
        req.headers.authorization = verifiedJWT.payload?.id;
        if (verifiedJWT.payload.id) {
            const user = await userSchema_1.default.findOne({
                _id: verifiedJWT.payload.id,
                ban: false,
            });
            if (!user) {
                throw new Error("user banned");
            }
            else {
                next();
            }
        }
    }
    else if (!accessTokenusertoken && refreshTokenuser) {
        const { payload } = (0, jwtutils_1.verifyJwt)(refreshTokenuser);
        if (payload?.id) {
            const user = await userSchema_1.default.findOne({ _id: payload.id }, { password: 0 });
            if (!user) {
                throw new Error("user not exist or banned");
            }
            else {
                const access = await (0, jwtutils_1.jwtSign)({ id: user._id, name: user.userName, email: user.email }, "15min");
                res.cookie("accessTokenUser", access, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                    maxAge: 1000 * 60 * 60 * 24,
                });
                res.cookie("refreshTokenUser", refreshTokenuser, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    secure: true,
                    sameSite: 'none',
                    httpOnly: true,
                });
                console.log(access, 111);
                req.headers.authorization = user._id;
                req.cookies.accessTokenUser = access;
                next();
            }
        }
        else {
            throw new Error("token is not avialable");
        }
    }
});
//# sourceMappingURL=user.js.map