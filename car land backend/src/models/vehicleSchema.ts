import { Schema, model } from "mongoose";
import IVehicle from "../interfaces/vehicleInterface";

const vehicleSchema: Schema = new Schema({
    vehicleName: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
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
        // required: true
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


const vehicleModel=model<IVehicle>('vehicle',vehicleSchema)
export default vehicleModel