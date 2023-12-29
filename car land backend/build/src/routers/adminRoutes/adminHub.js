"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hubManagement_1 = require("../../controllers/adminController/hubManagement");
const adminHub = (0, express_1.Router)();
adminHub.get('/allhubs', hubManagement_1.getAllHubs);
adminHub.post('/banhub', hubManagement_1.banHub);
adminHub.get('/search', hubManagement_1.hubSearch);
adminHub.patch('/verifyhub', hubManagement_1.verifyHub);
exports.default = adminHub;
//# sourceMappingURL=adminHub.js.map