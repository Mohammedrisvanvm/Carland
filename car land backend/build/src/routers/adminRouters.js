"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = __importDefault(require("./adminRoutes/adminAuth"));
const adminUser_1 = __importDefault(require("./adminRoutes/adminUser"));
const adminVendor_1 = __importDefault(require("./adminRoutes/adminVendor"));
const adminHub_1 = __importDefault(require("./adminRoutes/adminHub"));
const adminCar_1 = __importDefault(require("./adminRoutes/adminCar"));
const adminBooking_1 = __importDefault(require("./adminRoutes/adminBooking"));
const adminDashboard_1 = __importDefault(require("./adminRoutes/adminDashboard"));
const adminSalesReport_1 = __importDefault(require("./adminRoutes/adminSalesReport"));
const router = (0, express_1.Router)();
router.use('/auth', adminAuth_1.default);
router.use('/usermanagement', adminUser_1.default);
router.use('/vendormanagement', adminVendor_1.default);
router.use('/hubmanagement', adminHub_1.default);
router.use('/carmanagement', adminCar_1.default);
router.use('/bookingmanagement', adminBooking_1.default);
router.use('/dashboard', adminDashboard_1.default);
router.use('/salesreport', adminSalesReport_1.default);
exports.default = router;
//# sourceMappingURL=adminRouters.js.map