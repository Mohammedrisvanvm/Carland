import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVendor from "../../interfaces/vendorInterface";
import VenderModel from "../../models/vendorSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../utils/twilio/twilio";

export const vendorLoginController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface iSign {
      email: string;
      number: number;
    }
    const data: iSign = req.body.values;

    const venderExist: IVendor | null = await VenderModel.findOne({
      phoneNumber: data.number,ban:false
    });

    if (venderExist) {
      let response: number = await sendOtp(req.body.values.number);
      console.log(response);
      
      let Token = jwtSign({ token: response, user: req.body.values }, "5min");

      res
        .status(200)
        .cookie("vendorOtpToken", Token, { httpOnly: true, maxAge: 300000 })
        .json({ message: "hello" });
    } else {
      throw new Error("Invalid data or banned");
    }
  }
);
export const venderSignUpController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface iSign {
      email: string;
      userName: string;
      number: number;
    }

    const data: iSign = req.body.values;
    // const data:iSign = req.body

    const venderExist: IVendor | null = await VenderModel.findOne({
      email: data.email,
    });

    if (venderExist) {
      throw new Error("User Already Exists");
    } else {
      let response: number = await sendOtp(data.number);
      console.log(response);

      let Token = jwtSign({ token: response, user: data }, "5min");
      res
        .status(200)
        .cookie("vendorOtpToken", Token, { httpOnly: true, maxAge: 300000 })
        .json({ message: "message otp sented" });
    }
  }
);
interface VendorJwt {
  payload?: {
    token?: number;
    user?: {
      userName: string;
      email: string;
      number: number;
    };
  } | null;
  expired: boolean;
}
interface vendorbody {
  value: number;
}
export const vendorOtpverify = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const vendorOtpToken: string = req.cookies?.vendorOtpToken;

    const data: vendorbody = req.body;
    if (vendorOtpToken) {
      const { payload, expired }: VendorJwt = verifyJwt(vendorOtpToken);
      if (payload?.token == data.value) {
        let vendorExist: IVendor | null = await VenderModel.findOne({
          phoneNumber: payload.user?.number,
        });

        if (!vendorExist) {
          const user: IVendor = await VenderModel.create({
            userName: payload.user?.userName,
            email: payload.user?.email,
            phoneNumber: payload.user?.number,
          });
          vendorExist = user;
        }

        const accessToken = jwtSign(
          {
            id: vendorExist?._id,
            name: vendorExist?.userName,
            email: vendorExist?.email,
            number: vendorExist?.phoneNumber,
          },
          "15min"
        );
        const refreshToken = jwtSign(
          { number: vendorExist?.phoneNumber },
          "7d"
        );

        res.status(200).cookie("accessTokenvendor", accessToken, {
          maxAge: 900000,
          httpOnly: true,
        });

        res
          .cookie("refreshTokenvendor", refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
          })
          .json({ vendor: vendorExist, accessToken });
      } else {
        throw new Error("invalid otp");
      }
    }
  }
);

export const vendorLogOut = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("accessTokenvendor", "", { httpOnly: true, maxAge: 0 });
    res
      .cookie("refreshTokenvendor", "", { httpOnly: true, maxAge: 0 })
      .status(200)
      .json({ message: "logout user" });
  }
);
