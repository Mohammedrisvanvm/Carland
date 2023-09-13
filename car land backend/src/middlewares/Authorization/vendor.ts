import { Response, Request, NextFunction } from "express";
import VendorModel from "../../models/vendorSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import IVendor from "../../interfaces/vendorInterface";
import AsyncHandler from "express-async-handler";

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

interface IVerifyjwt {
  payload?: {
    number?: string;
  } | null;
  expired: boolean;
}
export const vendorAuthenticate = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenvendortoken: string = req.cookies.accessTokenvendor;
    const refreshTokenvendor: string = req.cookies.refreshTokenvendor;
    console.log(refreshTokenvendor,accessTokenvendortoken);
    
    if (!accessTokenvendortoken && !refreshTokenvendor) {
      throw new Error("Access Denied");
    }
    if (accessTokenvendortoken) {
      next();
    } else if (!accessTokenvendortoken && refreshTokenvendor) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenvendor);

      if (verifiedJWT.payload.number) {
        const vendor: IVendor | null = await VendorModel.findOne(
          { phoneNumber: verifiedJWT.payload.number },
          { password: 0 }
        );

        if (!vendor) {
          throw new Error("user not exist");
        } else {
          const access: string = await jwtSign(
            { id: vendor._id, name: vendor.userName, email: vendor.email },
            "15min"
          );

          res.cookie("accessTokenvendor", access, {
            httpOnly: true,
            maxAge: (15 * 60 * 1000),
          });
          res.cookie("refreshTokenvendor", refreshTokenvendor, {
            maxAge: (7 * 24 * 60 * 60),
            httpOnly: true,
          });

          req.cookies.accessTokenvendor = access;
          next();
        }
      } else {
        throw new Error("token is not avialable");
      }
    }
  }
);
