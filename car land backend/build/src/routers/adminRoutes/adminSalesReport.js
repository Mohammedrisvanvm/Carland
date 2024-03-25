"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminSalesReportManagement_1 = require("../../controllers/adminController/adminSalesReportManagement");
const adminSalesReport = (0, express_1.Router)();
adminSalesReport.get("/fetchreport", adminSalesReportManagement_1.salesReportAdmin);
exports.default = adminSalesReport;
//# sourceMappingURL=adminSalesReport.js.map