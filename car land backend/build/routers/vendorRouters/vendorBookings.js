"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorBookingcontroller_1 = require("../../controllers/venderController/vendorBookingcontroller");
const vendorBookings = (0, express_1.Router)();
vendorBookings.get("/getBookings", vendorBookingcontroller_1.getBookings);
vendorBookings.get("/pickUpreqAction", vendorBookingcontroller_1.pickUpreqAction);
vendorBookings.patch("/dropoffreqaction", vendorBookingcontroller_1.dropOffAction);
vendorBookings.get("/salesreports", vendorBookingcontroller_1.salesReportVendor);
exports.default = vendorBookings;
//# sourceMappingURL=vendorBookings.js.map