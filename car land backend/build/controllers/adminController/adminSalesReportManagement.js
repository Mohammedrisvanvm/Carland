"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesReportAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
exports.salesReportAdmin = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const bookingDetailsAdmin = await bookingSchema_1.default
        .aggregate([
        {
            $match: {
                status: "Completed",
                $or: [
                    { vehicleName: { $regex: search, $options: "i" } },
                    { hubName: { $regex: search, $options: "i" } },
                ],
            },
        },
    ])
        .skip(skip)
        .limit(5)
        .sort({ createdAt: -1 });
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
    const count = await bookingSchema_1.default.find({ status: "Completed" }).count();
    const result = await bookingSchema_1.default.aggregate([
        {
            $match: {
                status: "Completed",
            },
        },
        {
            $group: {
                _id: null,
                totalprice: { $sum: "$totalPrice" },
            },
        },
    ]);
    res.json({
        message: "booking Details Admin",
        salesReportAdmin: bookingDetailsWithImage,
        count,
        salesReportTotal: result[0].totalprice,
    });
});
//# sourceMappingURL=adminSalesReportManagement.js.map