"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.banVendor = exports.getAllVendors = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vendorSchema_1 = __importDefault(require("../../models/vendorSchema"));
exports.getAllVendors = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const vendors = await vendorSchema_1.default.find({ $or: [
            {
                userName: { $regex: search, $options: "i" },
                email: { $regex: search, $options: "i" }
            },
        ] }).skip(skip)
        .limit(5)
        .sort({ createdAt: -1 });
    const count = await vendorSchema_1.default.countDocuments();
    res.status(200).json({ vendors, count });
});
exports.banVendor = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const vendor = await vendorSchema_1.default.findById(id);
    if (vendor) {
        vendor.ban = !vendor.ban;
        await vendor.save();
    }
    res.status(200).json({ message: "success" });
});
//# sourceMappingURL=vendorManagement.js.map