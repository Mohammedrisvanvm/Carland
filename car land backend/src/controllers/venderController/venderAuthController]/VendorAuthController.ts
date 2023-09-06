import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVendor from "../../../interfaces/vendorInterface";
import VenderModel from "../../../models/venderSchema";
import { jwtSign, verifyJwt } from "../../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../../utils/twilio/twilio";


export const vendorLoginController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const venderExist: IVendor | null = await VenderModel.findOne({
      phoneNumber: req.body.values.number,
    });
    console.log(venderExist);

    if (venderExist) {
      let response: number = await sendOtp(req.body.values.number);
      let Token = jwtSign(
        { token: response, user: req.body.values },
        "5min"
      );
      console.log(response);

      res
        .status(200)
        .cookie("vendorOtpToken", Token, { httpOnly: true, maxAge: 300000 })
        .json({ message: "hello" });
    } else {
      throw new Error("Invalid phone number or email");
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
        .json({ message: "hello" });
    }
  }
);
interface VendorJwt {
  payload: {
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
    try {
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
           vendorExist=user
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
            .json({ vendor: vendorExist });
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
