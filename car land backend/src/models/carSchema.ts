import { Schema } from "mongoose";

const carSchema: Schema = new Schema({
    carName: {
        type: String,
        required: true
    },
    carNumber: {
        type: Number,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    colour:{
        type:String,
        required:true
    },
    fuel: {
        type: String,
        required: true
    },
    numofseats: {
        type: Number,
        required: true
    },
    hubName: {
        type: String,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    }, fairPrice: {
        type: Number,
        required: true
    }, fairKm: {
        type: Number,
        required: true
    },
     status: {
        type: Boolean,
        required: true
    },
    specification: {
        type: Array,
        required: true
    },
    vehicleValidate: {
        type: Date,
        required: true
    },
    documents: {
        type: Array,
        required: true
    }

}, { timestamps: true })