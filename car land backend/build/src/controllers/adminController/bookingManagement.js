"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allBookings = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
exports.allBookings = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const bookingDetailsAdmin = await bookingSchema_1.default
        .find({
        $or: [
            { vehicleName: { $regex: search, $options: "i" } },
            { hubName: { $regex: search, $options: "i" } },
        ],
    })
        .skip(skip).limit(5).sort({ createdAt: -1 });
    const vehiclesID = bookingDetailsAdmin.map((item) => item.vehicleId);
    const vehicles = await vehicleSchema_1.default.find({
        _id: { $in: vehiclesID },
    });
    const vehicleImageMap = {};
    vehicles.forEach((vehicle) => {
        vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    const bookingDetailsWithImage = bookingDetailsAdmin.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
    }));
    const count = bookingDetailsWithImage.length <= 4 ? bookingDetailsWithImage.length : await bookingSchema_1.default.countDocuments();
    res.json({
        message: "booking Details Admin",
        bookingDetails: bookingDetailsWithImage,
        count
    });
});
//# sourceMappingURL=bookingManagement.js.map