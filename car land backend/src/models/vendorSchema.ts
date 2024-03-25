import { Schema, model } from "mongoose";
import IVendor from "../interfaces/vendorInterface";

const VendorSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    renthubs: {
      type: [{ type: Schema.Types.ObjectId }],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    verified_email: {
      type: Boolean,
    },
    ban: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VendorModel = model<IVendor>("vender", VendorSchema);
export default VendorModel;
