import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVendor from "../../interfaces/vendorInterface";
import vehicleModel from "../../models/vendorSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../utils/twilio/twilio";


export const vendorLoginController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface iSign {
      email: string;
      number: number;
    }
    const data: iSign = req.body.values;


    const venderExist: IVendor | null = await vehicleModel.findOne({
      phoneNumber: data.number,
      ban: false,
    });


    if (venderExist) {
      const response: number = await sendOtp(req.body.values.number);


      const Token = jwtSign({ token: response, vendor: req.body.values }, "5min");

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

    const venderExist: IVendor | null = await vehicleModel.findOne({
      email: data.email,
    });

    if (venderExist) {
      throw new Error("User Already Exists");
    } else {
      const response: number = await sendOtp(data.number);
  

      const Token = jwtSign({ token: response, vendor: data }, "5min");
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
    vendor?: {
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
      const { payload }: VendorJwt = verifyJwt(vendorOtpToken);
   
      
      if (payload?.token == data.value) {
        let vendorExist: IVendor | null = await vehicleModel.findOne({
          phoneNumber: payload.vendor?.number,
        });

        if (!vendorExist) {
          const vendor: IVendor = await vehicleModel.create({
            userName: payload.vendor?.userName,
            email: payload.vendor?.email,
            phoneNumber: payload.vendor?.number,
          });
          vendorExist = vendor;
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
          maxAge:1000 * 60 * 60 * 24,
          httpOnly: true,
        });

        res
          .cookie("refreshTokenvendor", refreshToken, {
            maxAge:1000 * 60 * 60 * 24 * 7,
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
    res.cookie("accessTokenvendor", "", { httpOnly: true,sameSite:'none', maxAge: 0 });
    res
      .cookie("refreshTokenvendor", "", { httpOnly: true,sameSite:'none', maxAge: 0 })
      .status(200)
      .json({ message: "logout user" });
  }
);
