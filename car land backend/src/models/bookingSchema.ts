import { Schema, model } from "mongoose";
import IBook from "../interfaces/bookingInterface";
import IBookWithTimestamps from "../interfaces/bookingInterface";

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
    hubName: {
      type: String,
      required: true,
    },
    vehicleName: {
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
    carPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    days: {
      type: Number,
      required: true,
    },
    pickuptime: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: Object,
      default: null,
    },
    paymentStatus: {
      type: String,
      enum: ["HalfPaid", "FullPaid"],
     required:true
    },
    status: {
      type: String,
      enum: ["PickUp", "Ongoing", "Dropoff", "Completed", "Cancelled"],
    },
  },
  { timestamps: true }
);

const bookModel = model<IBookWithTimestamps>("booking", bookingSchema);

export default bookModel;
