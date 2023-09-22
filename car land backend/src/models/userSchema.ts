import mongoose, { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import IUser from "../interfaces/userInterface";
import { NextFunction } from "express";

const userSchema: Schema = new Schema(
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
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    image: {
      type: String,
    },
    gender:{
      type:String,
      default:null
    },
    phone_number: {
      type: Number,
      default:null
    },
    verified_email: {
      type: Boolean,
      default: true,
    },
    verified_phonenumber: {
      type: Boolean,
      default: false,
    },
    ban: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  console.log(enteredPassword, "pass");

  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = model<IUser>("user", userSchema);
export default userModel;
