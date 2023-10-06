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
      throw new Error("Vendor Access Denied");
    }
    if (accessTokenvendortoken) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenvendor);

      
      req.headers.authorization = verifiedJWT.payload.number;
      if (verifiedJWT.payload.number) {
        const vendor: IVendor | null = await VendorModel.findOne(
          { phoneNumber: verifiedJWT.payload.number,ban:false },
         
        );

        if (!vendor) {
          throw new Error("user banned");
        } else {
      next();
        }
      }
    } else if (!accessTokenvendortoken && refreshTokenvendor) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenvendor);

      if (verifiedJWT.payload.number) {
        const vendor: IVendor | null = await VendorModel.findOne(
          { phoneNumber: verifiedJWT.payload.number,ban:false },
          { password: 0 }
        );

        if (!vendor) {
          throw new Error("user not exist or banned");
        } else {
          const access: string = await jwtSign(
            { id: vendor._id, name: vendor.userName, email: vendor.email },
            "15min"
          );

          res.cookie("accessTokenvendor", access, {
            httpOnly: true,
            maxAge:  1000 * 60 * 60 * 24,
          });
          res.cookie("refreshTokenvendor", refreshTokenvendor, {
            maxAge:  1000 * 60 * 60 * 24 * 7,
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
