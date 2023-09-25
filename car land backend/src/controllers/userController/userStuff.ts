import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../utils/twilio/twilio";
import user from "../../models/userSchema";
import userModel from "../../models/userSchema";
import cloudinary from "../../config/cloudinary";
import fs from "fs";

interface UserJwt {
  payload?: {
    token?: number;
    number?: number;
    user?: {
      id: string;
      userName: string;
      email: string;
      number?: number | null;
      password?: string;
    };
  };
  expired: boolean;
}
export const verifyNumber = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // console.log(11,req.headers.authorization);

    const number: number = req.body.phoneNumber;
    const otp = await sendOtp(number);

    console.log(otp);

    const Token = jwtSign({ token: otp, number }, "5min");
    res
      .status(200)
      .cookie("verificationToken", Token, { httpOnly: true, maxAge: 300000 })
      .json({ message: "otp sented" });
  }
);

export const verifyOtp = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token: string = req.headers.authorization;
    const otp: number = req.body.otp;
    const verificationToken: string = req.cookies?.verificationToken;

    const { payload }: UserJwt = verifyJwt(verificationToken);

    if (otp == payload.token) {
      await userModel.findByIdAndUpdate(
        { _id: token },
        { $set: { phone_number: payload.number, verified_phonenumber: true } }
      );
      res.status(200).json({ message: "verified" });
    } else {
      res.status(401).json({ message: "error otp" });
    }
  }
);

export const userprofileData = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const token: string = req.headers.authorization;
    const userjwt: UserJwt = verifyJwt(token);
    console.log(req.body);
    type profile = {
      gender: string;
      userName: string;
    };

    const { gender, userName }: profile = req.body;
    if (userName) {
      await userModel.findByIdAndUpdate(
        { _id: token },
        { $set: { gender: gender, userName: userName } }
      );
    } else {
      await userModel.findByIdAndUpdate(
        { _id: token },
        { $set: { gender: gender } }
      );
    }

    res.status(204).json({ message: "updated user profile" });
  }
);

export const ProfileVerificationData = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface UploadedFile {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    }

    const data: UploadedFile[] | any = req.files;

console.log(data);

    const Documents = await Promise.all(
      data.map(async (image: UploadedFile) => {
        try {
          const tempFilePath = image.originalname;
          fs.writeFileSync(tempFilePath, image.buffer);
          const response = await cloudinary.uploader.upload(tempFilePath, {
            folder: "Documents",
          });

          fs.unlinkSync(tempFilePath);

          return response.url;
        } catch (error) {
          console.error("Error uploading image:", error);
          return "";
        }
      })
    );
    const user: string = req.headers.authorization;


    const currentuser=await userModel.findById(user)
console.log(currentuser,Documents);
const license: string[] = [Documents[0], Documents[1]];
const adhaar: string[] = [Documents[2], Documents[3]];
console.log(license,adhaar);

if(currentuser){
  currentuser.profileVerificationRequest=true
  currentuser.adhaar=adhaar
  currentuser.license=license
  await currentuser.save()
}

    res.json({ message: user });
  }
);
