"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorAuthenticate = void 0;
const vendorSchema_1 = __importDefault(require("../../models/vendorSchema"));
const jwtutils_1 = require("../../utils/jwtUtils/jwtutils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.vendorAuthenticate = (0, express_async_handler_1.default)(async (req, res, next) => {
    const accessTokenvendortoken = req.cookies.accessTokenvendor;
    const refreshTokenvendor = req.cookies.refreshTokenvendor;
    console.log(refreshTokenvendor, accessTokenvendortoken);
    if (!accessTokenvendortoken && !refreshTokenvendor) {
        throw new Error("Vendor Access Denied");
    }
    if (accessTokenvendortoken) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshTokenvendor);
        req.headers.authorization = verifiedJWT.payload.number;
        if (verifiedJWT.payload.number) {
            const vendor = await vendorSchema_1.default.findOne({ phoneNumber: verifiedJWT.payload.number, ban: false });
            if (!vendor) {
                throw new Error("user banned");
            }
            else {
                next();
            }
        }
    }
    else if (!accessTokenvendortoken && refreshTokenvendor) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshTokenvendor);
        if (verifiedJWT.payload.number) {
            const vendor = await vendorSchema_1.default.findOne({ phoneNumber: verifiedJWT.payload.number, ban: false }, { password: 0 });
            if (!vendor) {
                throw new Error("user not exist or banned");
            }
            else {
                const access = await (0, jwtutils_1.jwtSign)({ id: vendor._id, name: vendor.userName, email: vendor.email }, "15min");
                res.cookie("accessTokenvendor", access, {
                    httpOnly: true,
                    sameSite: 'none',
                    maxAge: 1000 * 60 * 60 * 24,
                });
                res.cookie("refreshTokenvendor", refreshTokenvendor, {
                    maxAge: 1000 * 60 * 60 * 24 * 7,
                    sameSite: 'none',
                    httpOnly: true,
                });
                req.cookies.accessTokenvendor = access;
                next();
            }
        }
        else {
            throw new Error("token is not avialable");
        }
    }
});
//# sourceMappingURL=vendor.js.map