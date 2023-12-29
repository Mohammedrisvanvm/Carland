"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleController_1 = require("../../controllers/venderController/vehicleController");
const vendorVehicleRouters = (0, express_1.Router)();
vendorVehicleRouters.post('/addvehicle', vehicleController_1.addVehicleController);
vendorVehicleRouters.get('/getvehicles', vehicleController_1.getVehiclesController);
exports.default = vendorVehicleRouters;
//# sourceMappingURL=vendorVehicleRouters.js.map