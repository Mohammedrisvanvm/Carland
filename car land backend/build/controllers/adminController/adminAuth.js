"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogout = exports.adminCheck = exports.adminLogin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminSchema_1 = __importDefault(require("../../models/adminSchema"));
const jwtutils_1 = require("../../utils/jwtUtils/jwtutils");
exports.adminLogin = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body.values;
    // const data: IADMINB = req.body
    const response = await adminSchema_1.default.findOne({
        email: data.email,
    });
    if (response && (await response.matchPassword(data.password))) {
        const accessToken = (0, jwtutils_1.jwtSign)({ id: response._id, email: response.email }, "15m");
        const refreshToken = (0, jwtutils_1.jwtSign)({ email: response.email }, "7d");
        res.status(200).cookie("accessTokenAdmin", accessToken, {
            maxAge: 300000,
            httpOnly: true,
            sameSite: "lax",
        });
        res
            .cookie("refreshTokenAdmin", refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
            sameSite: "lax",
        })
            .json({ admin: response, accessToken: accessToken });
    }
    else {
        throw new Error("Invalid email or password");
    }
});
exports.adminCheck = (0, express_async_handler_1.default)(async (req, res) => {
    const accessTokenAdmin = req.cookies?.accessTokenAdmin;
    const refreshTokenAdmin = req.cookies?.refreshTokenAdmin;
    if (accessTokenAdmin) {
        res.json({ isLoggedin: true });
    }
    else if (refreshTokenAdmin) {
        const verifiedJWT = (0, jwtutils_1.verifyJwt)(refreshTokenAdmin);
        const access = (0, jwtutils_1.jwtSign)({ email: verifiedJWT.payload?.email }, "15min");
        res.cookie("accessTokenAdmin", access, { httpOnly: true, sameSite: 'none', maxAge: 5000 });
        res
            .cookie("refreshTokenAdmin", refreshTokenAdmin, {
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60,
        })
            .json({ isloggedin: true });
    }
    else {
        res.json({ isLoggedin: false });
    }
});
exports.adminLogout = (0, express_async_handler_1.default)(async (req, res) => {
    res.cookie("accessTokenAdmin", "", { httpOnly: true, maxAge: 0, sameSite: 'none', });
    res
        .cookie("refreshTokenAdmin", "", { httpOnly: true, maxAge: 0, sameSite: 'none', })
        .json({ message: "admin Logouted" });
});
//# sourceMappingURL=adminAuth.js.map