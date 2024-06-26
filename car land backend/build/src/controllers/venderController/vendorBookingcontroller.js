"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesReportVendor = exports.dropOffAction = exports.pickUpreqAction = exports.getBookings = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
const takeOffMail_1 = require("../../utils/nodeMailer/takeOffMail");
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const dropOffMail_1 = require("../../utils/nodeMailer/dropOffMail");
exports.getBookings = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const hubID = req.query.hubID;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const bookingDetailsVendor = await bookingSchema_1.default
        .find({
        hubId: { $in: hubID },
        vehicleName: { $regex: search, $options: "i" },
    })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(5);
    const vehiclesID = bookingDetailsVendor.map((item) => item.vehicleId);
    const vehicles = await vehicleSchema_1.default.find({
        _id: { $in: vehiclesID },
    });
    const vehicleImageMap = {};
    vehicles.forEach((vehicle) => {
        vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    const bookingDetailsWithImage = bookingDetailsVendor.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
    }));
    const count = (await bookingSchema_1.default.find({ hubId: hubID })).length;
    res.json({
        message: "unique hub bookingDetails",
        bookingDetails: bookingDetailsWithImage,
        count,
    });
});
exports.pickUpreqAction = (0, express_async_handler_1.default)(async (req, res) => {
    const { bookingID } = req.query;
    await bookingSchema_1.default.findByIdAndUpdate({ _id: bookingID }, { $set: { status: "Ongoing" } });
    const booking = await bookingSchema_1.default.findOne({
        _id: bookingID,
    });
    const user = await userSchema_1.default.findById(booking.userId);
    (0, takeOffMail_1.mailServiceTakeOff)(user.email, user.userName, booking);
    res.status(200).json({ message: "Request accepted" });
});
exports.dropOffAction = (0, express_async_handler_1.default)(async (req, res) => {
    const bookingID = req.query.bookingID;
    const booking = await bookingSchema_1.default.findOneAndUpdate({ _id: bookingID }, { $set: { status: "Completed" } });
    const user = await userSchema_1.default.findById(booking.userId);
    (0, dropOffMail_1.mailServiceDropOff)(user.email, user.userName, booking);
    const vehicle = await vehicleSchema_1.default.findById(booking.vehicleId);
    const targetPickUpDate = new Date(booking.bookingStartDate);
    const targetDropOffDate = new Date(booking.bookingEndDate);
    if (vehicle.bookingDates.pickUp.some((date) => date.getTime() === booking.bookingStartDate.getTime())) {
        await vehicleSchema_1.default.findByIdAndUpdate(booking.vehicleId, {
            $pull: {
                "bookingDates.pickUp": targetPickUpDate,
                "bookingDates.dropOff": targetDropOffDate,
            },
        });
    }
    res.status(200).json({ message: "completed" });
});
exports.salesReportVendor = (0, express_async_handler_1.default)(async (req, res) => {
    const hubID = req.query.hubID;
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const bookingDetailsVendor = await bookingSchema_1.default
        .aggregate([
        {
            $match: {
                hubId: hubID,
                status: "Completed",
                vehicleName: {
                    $regex: search,
                    $options: "i",
                },
            },
        },
    ])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(5);
    const vehiclesID = bookingDetailsVendor.map((item) => item.vehicleId);
    const vehicles = await vehicleSchema_1.default.find({
        _id: { $in: vehiclesID },
    });
    const vehicleImageMap = {};
    vehicles.forEach((vehicle) => {
        vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    const bookingDetailsWithImage = bookingDetailsVendor.map((item) => ({
        ...item,
        image: vehicleImageMap[item.vehicleId],
    }));
    const count = (await bookingSchema_1.default.find({ hubId: hubID, status: "Completed" })).length;
    const result = await bookingSchema_1.default.aggregate([
        {
            $match: {
                hubId: hubID,
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
    res.status(200).json({
        salesReport: bookingDetailsWithImage,
        message: "sales Report",
        count,
        salesReportTotal: result[0].totalprice,
    });
});
//# sourceMappingURL=vendorBookingcontroller.js.map