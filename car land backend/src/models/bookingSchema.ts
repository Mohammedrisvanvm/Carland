import { Schema, model } from "mongoose";
import IBook from "../interfaces/bookingInterface";

const bookingSchema: Schema = new Schema(
  {
    hubId: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    bookingStartDate: {
      type: Date,
      required: true,
    },
    bookingEndDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const bookModel=model<IBook>('booking',bookingSchema)

export default bookModel
