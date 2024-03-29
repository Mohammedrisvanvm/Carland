import { Schema, model } from "mongoose";

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
    locationName: {
      type: String,
    },
    days: {
      type: Number,
      required: true,
    },
    paymentDetails: {
      type: Object,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Refunded", "FullPaid"],
      required: true,
    },
    refundedDetails: {
      type: Object,
      default: null,
    },
    tempStatus: {
      type: String,
      enum: ["pickUp", "pickUpreq", "cancel"],
      default: "pickUp",
    },
    status: {
      type: String,
      enum: [
        "PickUp",
        "pickUpreq",
        "Ongoing",
        "dropOffReq",
        "Completed",
        "Cancelled",
      ],
      default: "PickUp",
    },
  },
  { timestamps: true }
);

const bookModel = model<IBookWithTimestamps>("booking", bookingSchema);

export default bookModel;
