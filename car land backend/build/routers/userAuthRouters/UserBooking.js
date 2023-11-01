"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_1 = require("../../controllers/userController/booking");
const UserBookingRouter = (0, express_1.Router)();
UserBookingRouter.post('/bookcar', booking_1.bookCar);
UserBookingRouter.post('/razorpay', booking_1.razorpayPayment);
UserBookingRouter.post('/razorpayverify', booking_1.verifyRazorpayPayment);
UserBookingRouter.get('/bookingconfirmdetails', booking_1.bookingConfirmDetails);
UserBookingRouter.get('/bookingdetails', booking_1.bookingDetails);
UserBookingRouter.patch('/pickupReq', booking_1.pickupReq);
UserBookingRouter.patch('/dropoffreq', booking_1.dropOffReq);
UserBookingRouter.patch('/cancelbooking', booking_1.cancelBooking);
exports.default = UserBookingRouter;
//# sourceMappingURL=UserBooking.js.map