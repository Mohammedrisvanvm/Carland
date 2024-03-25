"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userManagement_1 = require("../../controllers/adminController/userManagement");
const adminUser = (0, express_1.Router)();
adminUser.get("/allusers", userManagement_1.getAllUser);
adminUser.post("/banuser", userManagement_1.banUser);
adminUser.post("/verifyprofile", userManagement_1.ProfileVerification);
exports.default = adminUser;
//# sourceMappingURL=adminUser.js.map