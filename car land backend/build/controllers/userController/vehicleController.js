"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleCar = exports.userVehicles = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
const hubSchema_1 = __importDefault(require("../../models/hubSchema"));
const calculateDistance_1 = require("../../helpers/calculateDistance");
const mongoose_1 = __importDefault(require("mongoose"));
exports.userVehicles = (0, express_async_handler_1.default)(async (req, res) => {
    const pageNumber = Number(req.query.currentPage);
    const { search, filter, lat, lng, seletedDate } = req.query;
    console.log(search, "1", filter, "2", lat, "3", lng, "4", seletedDate);
    const query = { isVerified: true };
    if (search) {
        query.vehicleName = new RegExp(search, "i");
    }
    if (filter) {
        query.fuel = filter;
    }
    // if(seletedDate){
    //   query.bookingDates.pickUp={$ne:seletedDate[0]}
    //   query.bookingDates.dropOff={$ne:seletedDate[1]}
    // }
    const hubDetails = await hubSchema_1.default.find();
    const filteredHubDetails = hubDetails.filter((item) => {
        const value = (0, calculateDistance_1.calculateDistance)(item.location.latitude, item.location.longitude, lat, lng);
        return value <= 50;
    });
    if (filteredHubDetails.length == 0 && lat) {
        return res.json({ vehicles: "" });
    }
    const filteredVehicles = filteredHubDetails.map((item) => {
        return item.vehicles;
    });
    const nonEmptyVehicles = filteredVehicles.filter((arr) => arr.length > 0);
    const perPage = 4;
    const skip = (pageNumber - 1) * perPage;
    const filter1 = {
        isVerified: true,
    };
    if (filter) {
        filter1.fuel = filter;
    }
    if (search) {
        filter1.vehicleName = {
            $regex: new RegExp(search, "i"),
        };
    }
    if (nonEmptyVehicles.length > 0) {
        filter1["_id"] = {
            $in: nonEmptyVehicles
                .flat()
                .map((id) => new mongoose_1.default.Types.ObjectId(id)),
        };
    }
    const vehicles = await vehicleSchema_1.default.aggregate([
        { $match: filter1 },
        {
            $skip: skip,
        },
        {
            $limit: perPage,
        },
    ]);
    const count = await vehicleSchema_1.default.countDocuments(query);
    res.json({ vehicles, count });
});
exports.singleCar = (0, express_async_handler_1.default)(async (req, res) => {
    const id = typeof req.query.id === "string" ? req.query.id : "";
    const vehicle = await vehicleSchema_1.default.findById(id);
    const hub = await hubSchema_1.default.findOne({ vehicles: { $in: [id] } });
    const datesArray = [];
    for (let i = 0; i < vehicle.bookingDates.pickUp.length; i++) {
        const currentDate = new Date(vehicle.bookingDates.pickUp[i]);
        const dropOffDate = vehicle.bookingDates.dropOff[i];
        while (currentDate <= dropOffDate) {
            datesArray.push(new Date(currentDate));
            currentDate.setHours(0, 0, 0, 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
    res.status(200).json({
        vehicle,
        location: { placeName: hub.placeName, coords: hub.location },
        datesArray,
    });
});
//# sourceMappingURL=vehicleController.js.map