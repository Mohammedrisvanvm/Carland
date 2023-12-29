"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CarManagement_1 = require("../../controllers/adminController/CarManagement");
const adminCar = (0, express_1.Router)();
adminCar.get("/allcars", CarManagement_1.getAllCars);
adminCar.patch("/bancar", CarManagement_1.banCar);
adminCar.patch("/verifycar", CarManagement_1.verifyCar);
exports.default = adminCar;
//# sourceMappingURL=adminCar.js.map