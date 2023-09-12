import { Schema, model } from "mongoose";
import Ihub from "src/interfaces/hubInterface";

const hubSchema: Schema = new Schema(
  {
    hubName: {
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
      type: String,
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
    licence: {
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