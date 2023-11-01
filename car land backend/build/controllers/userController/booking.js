"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropOffReq = exports.cancelBooking = exports.pickupReq = exports.bookingDetails = exports.bookingConfirmDetails = exports.verifyRazorpayPayment = exports.bookCar = exports.razorpayPayment = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
const hubSchema_1 = __importDefault(require("../../models/hubSchema"));
const dateCount_1 = require("../../helpers/dateCount");
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const createId_1 = require("../../helpers/createId");
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const confirmBooking_1 = require("../../utils/nodeMailer/confirmBooking");
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});
function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
exports.razorpayPayment = (0, express_async_handler_1.default)(async (req, res) => {
    const { amount } = req.body.data;
    const response = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: generateRandomString(10),
    });
    res.json({ message: "razorpay data", razorpay: response });
});
exports.bookCar = (0, express_async_handler_1.default)(async (req, res) => {
    const { pickUpDate, dropOffDate, carId, amount, razorpay_payment_id, razorpay_order_id, razorpay_signature, } = req.body.data;
    const userId = req.headers.authorization;
    const user = await userSchema_1.default.findById(userId);
    const hubDetails = await hubSchema_1.default.findOne({ vehicles: { $in: carId } }, { _id: 1, hubName: 1, placeName: 1 });
    const startDate = new Date(pickUpDate);
    startDate.setHours(startDate.getHours() + 5);
    startDate.setMinutes(startDate.getMinutes() + 30);
    const endDate = new Date(dropOffDate);
    endDate.setHours(endDate.getHours() + 5);
    endDate.setMinutes(endDate.getMinutes() + 30);
    const days = (0, dateCount_1.dateCount)(startDate, endDate);
    const vehicle = await vehicleSchema_1.default.findByIdAndUpdate({ _id: carId }, {
        $push: {
            "bookingDates.pickUp": startDate,
            "bookingDates.dropOff": endDate,
        },
    });
    const paymentStatus = "FullPaid";
    const booking = await bookingSchema_1.default.create({
        hubId: hubDetails._id,
        vehicleId: carId,
        userId,
        hubName: hubDetails.hubName,
        vehicleName: vehicle.vehicleName,
        locationName: hubDetails.placeName,
        bookingStartDate: pickUpDate,
        bookingEndDate: dropOffDate,
        carPrice: vehicle.fairPrice,
        paymentStatus,
        paymentDetails: {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        },
        totalPrice: amount,
        days,
    });
    booking.save();
    (0, confirmBooking_1.mailServiceConfirmBooking)(user.email, user.userName, booking);
    res.json({ id: booking._id });
});
exports.verifyRazorpayPayment = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body.data;
    const token = data.razorpay_order_id + "|" + data.razorpay_payment_id;
    const secretKey = process.env.RAZORPAY_SECRET;
    let generated_signature = crypto_1.default.createHmac("SHA256", secretKey);
    generated_signature.update(token);
    generated_signature = generated_signature.digest("hex");
    if (generated_signature == data.razorpay_signature) {
        res.json({ message: "verified" });
    }
    else {
        res.json({ message: "not verified" });
    }
});
exports.bookingConfirmDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const id = typeof req.query.bookingID === "string" ? req.query.bookingID : "";
    const bookingConfirmDetails = await bookingSchema_1.default.findById(id);
    res.json({ message: "got", bookingConfirmDetails });
});
exports.bookingDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.headers.authorization;
    const bookingDetails = await bookingSchema_1.default
        .find({
        userId,
    })
        .sort({ createdAt: -1 });
    const vehiclesID = bookingDetails.map((item) => item.vehicleId);
    const hubID = bookingDetails.map((item) => item.hubId);
    const vehicles = await vehicleSchema_1.default
        .find({
        _id: { $in: vehiclesID },
    })
        .sort();
    const hubs = await hubSchema_1.default
        .find({
        _id: { $in: hubID },
    })
        .sort();
    const vehicleImageMap = {};
    const hubLongitude = {};
    const hubLatitude = {};
    vehicles.forEach((vehicle) => {
        vehicleImageMap[vehicle._id] = vehicle.singleImage;
    });
    hubs.forEach((hub) => {
        hubLatitude[hub._id] = hub.location.latitude;
        hubLongitude[hub._id] = hub.location.longitude;
    });
    const bookingDetailsWithImage = bookingDetails.map((item) => ({
        ...item,
        hubLatitude: hubLatitude[item.hubId],
        hubLongitude: hubLongitude[item.hubId],
        image: vehicleImageMap[item.vehicleId],
    }));
    res.json({
        message: "user booking Details",
        bookingDetails: bookingDetailsWithImage,
    });
});
exports.pickupReq = (0, express_async_handler_1.default)(async (req, res) => {
    const { bookingID } = req.query;
    await bookingSchema_1.default.updateOne({ _id: bookingID }, { $set: { status: "pickUpreq" } });
    res.json({ message: "pickup Requested" });
});
exports.cancelBooking = (0, express_async_handler_1.default)(async (req, res) => {
    const { bookingID } = req.query;
    const booking = await bookingSchema_1.default.findById(bookingID);
    razorpay.payments
        .refund(booking.paymentDetails.razorpay_payment_id, {
        amount: `${booking.totalPrice}`,
        speed: "optimum",
        receipt: `${(0, createId_1.generateId)()}`,
    })
        .then(async (res) => {
        booking.status = "Cancelled";
        booking.paymentStatus = "Refunded";
        booking.refundedDetails = res;
        booking.save();
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
    })
        .catch((error) => {
        console.log(error);
    });
    res.status(200).json({ message: `${bookingID}` });
});
exports.dropOffReq = (0, express_async_handler_1.default)(async (req, res) => {
    const bookingID = req.query.bookingID;
    const booking = await bookingSchema_1.default.findOneAndUpdate({ _id: bookingID }, { $set: { status: "dropOffReq" } });
    res.json({ message: "dropOff Requested" });
});
//# sourceMappingURL=booking.js.map