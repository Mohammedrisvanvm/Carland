"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorManagement_1 = require("../../controllers/adminController/vendorManagement");
const adminvendor = (0, express_1.Router)();
adminvendor.get('/allvendors', vendorManagement_1.getAllVendors);
adminvendor.post('/banvendor', vendorManagement_1.banVendor);
exports.default = adminvendor;
//# sourceMappingURL=adminVendor.js.map