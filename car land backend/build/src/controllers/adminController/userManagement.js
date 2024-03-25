"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileVerification = exports.banUser = exports.getAllUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userSchema_1 = __importDefault(require("../../models/userSchema"));
exports.getAllUser = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const users = await userSchema_1.default.find({ $or: [
            {
                userName: { $regex: search, $options: "i" },
                email: { $regex: search, $options: "i" }
            },
        ] }).skip(skip)
        .limit(5)
        .sort({ createdAt: -1 });
    const count = await userSchema_1.default.countDocuments();
    res.status(200).json({ users, count });
});
exports.banUser = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const user = await userSchema_1.default.findById(id);
    if (user) {
        user.ban = !user.ban;
        await user.save();
    }
    res.status(200).json({ message: "success" });
});
exports.ProfileVerification = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const user = await userSchema_1.default.findById(id);
    if (user) {
        user.verifiedProfile = !user.verifiedProfile;
        user.profileVerificationRequest = false;
        await user.save();
    }
    res.status(200).json({ message: "success" });
});
//# sourceMappingURL=userManagement.js.map