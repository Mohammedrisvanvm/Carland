"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardManagement_1 = require("../../controllers/adminController/dashboardManagement");
const adminDashboard = (0, express_1.Router)();
adminDashboard.get('/dashboardDetails', dashboardManagement_1.dashboardDetailsAdmin);
exports.default = adminDashboard;
//# sourceMappingURL=adminDashboard.js.map