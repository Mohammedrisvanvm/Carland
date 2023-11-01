"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehiclesController = exports.addVehicleController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vehicleSchema_1 = __importDefault(require("../../models/vehicleSchema"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const hubSchema_1 = __importDefault(require("../../models/hubSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
exports.addVehicleController = (0, express_async_handler_1.default)(async (req, res) => {
    const { vehicleName, vehicleNumber, year, colour, fuel, numofseats, hubName, mileage, fairPrice, fairKm, vehiclesingleimage, vehiclemultipleimage, specification, vehicleValidityDate, DocumentVehicle, } = req.body.values;
    const hubId = req.body.id;
    const docimage = await cloudinary_1.default.uploader
        .upload(DocumentVehicle, { folder: "carsDoc" })
        .then((response) => response.url);
    const singleImage = await cloudinary_1.default.uploader
        .upload(vehiclesingleimage, { folder: "cars" })
        .then((response) => response.url);
    const SubImages = await Promise.all(vehiclemultipleimage.map(async (image, index) => {
        try {
            const response = await cloudinary_1.default.uploader.upload(image, {
                folder: "cars",
            });
            return response.url;
        }
        catch (error) {
            console.error("Error uploading image:", error);
            return "";
        }
    }));
    const vehicle = await vehicleSchema_1.default.findOne({
        vehicleNumber,
    });
    if (!vehicle) {
        const vehicle = await vehicleSchema_1.default.create({
            vehicleName,
            vehicleNumber,
            colour,
            year,
            fuel,
            numofseats,
            hubName,
            mileage,
            fairPrice,
            fairKm,
            singleImage,
            SubImages,
            specification,
            vehicleValidityDate,
            DocumentVehicle: docimage,
        });
        const hub = await hubSchema_1.default.findByIdAndUpdate(hubId, {
            $addToSet: { vehicles: vehicle._id },
        });
        res.status(201).json({ message: `${vehicle.vehicleName}vehicle added` });
    }
    else {
        throw new Error("vehicle already exist");
    }
});
exports.getVehiclesController = (0, express_async_handler_1.default)(async (req, res) => {
    const { hubId, search } = req.query;
    var pipeline = [
        {
            $match: {
                _id: new ObjectId(hubId),
            },
        },
        {
            $lookup: {
                from: "vehicles",
                localField: "vehicles",
                foreignField: "_id",
                as: "vehicleData",
            },
        },
        {
            $unwind: "$vehicleData",
        },
        {
            $match: {
                $or: [
                    { "vehicleData.vehicleName": { $regex: search, $options: "i" } },
                    { "vehicleData.vehicleNumber": { $regex: search, $options: "i" } },
                ],
            },
        },
        {
            $replaceRoot: {
                newRoot: "$vehicleData",
            },
        },
    ];
    var vehicles = await hubSchema_1.default.aggregate(pipeline);
    res.status(200).json({ vehicles });
});
//# sourceMappingURL=vehicleController.js.map