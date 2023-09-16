import { Schema, model } from "mongoose";
import IVehicle from "../interfaces/vehicleInterface";
import { string } from "joi";

const vehicleSchema: Schema = new Schema(
  {
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
    },
    type: {
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
    hubId: {
      type: String,
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
      default: true,
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
    documents: {
      type: Array,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const vehicleModel = model<IVehicle>("vehicle", vehicleSchema);
export default vehicleModel;
