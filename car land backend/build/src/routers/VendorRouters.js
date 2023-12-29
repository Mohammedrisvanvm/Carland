"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorAuthRouters_1 = __importDefault(require("./vendorRouters/vendorAuthRouters"));
const vendorVehicleRouters_1 = __importDefault(require("./vendorRouters/vendorVehicleRouters"));
const hubRouters_1 = __importDefault(require("./vendorRouters/hubRouters"));
const vendor_1 = require("../middlewares/Authorization/vendor");
const vendorBookings_1 = __importDefault(require("./vendorRouters/vendorBookings"));
const router = (0, express_1.Router)();
router.use("/auth", vendorAuthRouters_1.default);
router.use("/vehicle", vendor_1.vendorAuthenticate, vendorVehicleRouters_1.default);
router.use("/hub", vendor_1.vendorAuthenticate, hubRouters_1.default);
router.use("/bookings", vendor_1.vendorAuthenticate, vendorBookings_1.default);
exports.default = router;
//# sourceMappingURL=VendorRouters.js.map