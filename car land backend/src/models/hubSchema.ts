import  { Schema, model } from "mongoose";
import Ihub from "../interfaces/hubInterface";

const hubSchema: Schema = new Schema(
  {
    hubName: {
      type: String,
      required: true,
    },
    placeName: {
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
    location: {
      type: Object,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    validityDate: {
      type: Date,
      required: true,
    },
    vehicles:{
      type:[{ type: Schema.Types.ObjectId }]
      
    },
    license: {
      type: String,
      required: true,
    },
    hubImage: {
      type: String,
      required: true,
    },
    hubMultiImage: {
      type: Array<String>,
      required: true,
    },
  },
  { timestamps: true }
);

const hubModel=model<Ihub>("hub",hubSchema)
export default hubModel