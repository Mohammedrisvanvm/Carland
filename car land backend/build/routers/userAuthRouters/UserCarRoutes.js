"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleController_1 = require("../../controllers/userController/vehicleController");
const userCarRouters = (0, express_1.Router)();
userCarRouters.get('/getvehicles', vehicleController_1.userVehicles);
userCarRouters.get('/singleCar', vehicleController_1.singleCar);
exports.default = userCarRouters;
//# sourceMappingURL=UserCarRoutes.js.map