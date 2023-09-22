import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../utils/twilio/twilio";
import user from "../../models/userSchema";
import userModel from "../../models/userSchema";

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
    const userjwt: UserJwt = verifyJwt(token);
    const { payload }: UserJwt = verifyJwt(verificationToken);
    console.log(userjwt, payload, otp);

    if (otp == payload.token) {
      await userModel.findByIdAndUpdate(
        { _id: userjwt.payload.user.id },
        { $set: { phone_number: payload.number } }
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
    console.log(token);

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
