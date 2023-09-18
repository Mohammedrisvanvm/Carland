import { Response, Request, NextFunction } from "express";
import userModel from "../../models/vendorSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import AsyncHandler from "express-async-handler";
import IUser from "../../interfaces/userInterface";

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
export const userAuthenticate = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenusertoken: string = req.cookies.accessTokenuser;
    const refreshTokenuser: string = req.cookies.refreshTokenuser;
    console.log(refreshTokenuser,accessTokenusertoken);
    
    if (!accessTokenusertoken && !refreshTokenuser) {
      throw new Error("Access Denied");
    }
    if (accessTokenusertoken) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenuser);

      if (verifiedJWT.payload.number) {
        const user: IUser | null = await userModel.findOne(
          { phoneNumber: verifiedJWT.payload.number,ban:false },
         
        );

        if (!user) {
          throw new Error("user banned");
        } else {
      next();
        }
      }
    } else if (!accessTokenusertoken && refreshTokenuser) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenuser);

      if (verifiedJWT.payload.number) {
        const user: IUser | null = await userModel.findOne(
          { phoneNumber: verifiedJWT.payload.number,ban:false },
          { password: 0 }
        );

        if (!user) {
          throw new Error("user not exist or banned");
        } else {
          const access: string = await jwtSign(
            { id: user._id, name: user.userName, email: user.email },
            "15min"
          );

          res.cookie("accessTokenuser", access, {
            httpOnly: true,
            maxAge: (15 * 60 * 1000),
          });
          res.cookie("refreshTokenuser", refreshTokenuser, {
            maxAge: (7 * 24 * 60 * 60),
            httpOnly: true,
          });

          req.cookies.accessTokenuser = access;
          next();
        }
      } else {
        throw new Error("token is not avialable");
      }
    }
  }
);
