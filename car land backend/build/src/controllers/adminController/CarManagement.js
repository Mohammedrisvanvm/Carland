"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCar = exports.banCar = exports.getAllCars = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
exports.getAllCars = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const vehicles = await vehicleSchema_1.default
        .find({
        $or: [
            { vehicleName: { $regex: search, $options: "i" } },
            { colour: { $regex: search, $options: "i" } },
        ],
    })
        .skip(skip)
        .limit(5)
        .sort({ createdAt: -1 });
    const count = await vehicleSchema_1.default.countDocuments();
    res.json({ vehicles, count });
});
exports.banCar = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const car = await vehicleSchema_1.default.findById(id);
    if (car) {
        car.ban = !car.ban;
        car.status = !car.status;
        await car.save();
    }
    res.status(200).json({ message: "success" });
});
exports.verifyCar = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const car = await vehicleSchema_1.default.findById(id);
    if (car) {
        car.isVerified = !car.isVerified;
        car.status = !car.status;
        await car.save();
    }
    res.status(200).json({ message: "success" });
});
//# sourceMappingURL=CarManagement.js.map