"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const vehicleSchema = new mongoose_1.Schema({
    vehicleName: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
    },
    numofseats: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    mileage: {
        type: Number,
        required: true,
    },
    fairPrice: {
        type: Number,
        required: true,
    },
    fairKm: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    singleImage: {
        type: String,
        required: true,
    },
    SubImages: {
        type: Array,
    },
    specification: {
        type: Array,
        required: true,
    },
    vehicleValidityDate: {
        type: Date,
        required: true,
    },
    DocumentVehicle: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    ban: {
        type: Boolean,
        default: false,
    },
    bookingDates: {
        pickUp: [
            {
                type: Date,
            },
        ],
        dropOff: [
            {
                type: Date,
            },
        ],
    },
}, { timestamps: true });
const vehicleModel = (0, mongoose_1.model)("vehicle", vehicleSchema);
exports.default = vehicleModel;
//# sourceMappingURL=vehicleSchema.js.map