"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingManagement_1 = require("../../controllers/adminController/bookingManagement");
const adminBooking = (0, express_1.Router)();
adminBooking.get('/allBookings', bookingManagement_1.allBookings);
exports.default = adminBooking;
//# sourceMappingURL=adminBooking.js.map