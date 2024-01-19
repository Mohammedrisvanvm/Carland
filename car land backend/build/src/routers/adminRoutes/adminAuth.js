"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuth_1 = require("../../controllers/adminController/adminAuth");
const adminAuth = (0, express_1.Router)();
adminAuth.post('/', adminAuth_1.adminLogin);
adminAuth.get('/adminCheck', adminAuth_1.adminCheck);
adminAuth.get('/logout', adminAuth_1.adminLogout);
exports.default = adminAuth;
//# sourceMappingURL=adminAuth.js.map