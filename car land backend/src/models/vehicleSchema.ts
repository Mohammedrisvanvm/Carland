import { Schema, model } from "mongoose";
import IVehicle from "../interfaces/vehicleInterface";


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
      type: {
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
      default: null,
    },
  },
  { timestamps: true }
);

const vehicleModel = model<IVehicle>("vehicle", vehicleSchema);
export default vehicleModel;
