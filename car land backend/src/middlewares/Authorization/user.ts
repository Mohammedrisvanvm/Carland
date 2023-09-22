import { Response, Request, NextFunction } from "express";

import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import AsyncHandler from "express-async-handler";
import IUser from "../../interfaces/userInterface";
import userModel from "../../models/userSchema";

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
    id: string;
  };
  expired: boolean;
}
export const userAuthenticate = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.headers.authorization);

    const accessTokenusertoken: string = req.cookies.accessTokenUser;
    const refreshTokenuser: string = req.cookies.refreshTokenUser;
    console.log(refreshTokenuser, accessTokenusertoken);

    if (!accessTokenusertoken && !refreshTokenuser) {
      throw new Error("Access Denied");
    }
    if (accessTokenusertoken) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenuser);
      req.headers.authorization = verifiedJWT.payload?.id;

      if (verifiedJWT.payload.id) {
        const user: IUser | null = await userModel.findOne({
          _id: verifiedJWT.payload.id,
          ban: false,
        });

        if (!user) {
          throw new Error("user banned");
        } else {
          next();
        }
      }
    } else if (!accessTokenusertoken && refreshTokenuser) {
      const { payload }: IVerifyjwt = verifyJwt(refreshTokenuser);

      if (payload?.id) {
        const user: IUser = await userModel.findOne(
          { _id: payload.id },
          { password: 0 }
        );

        if (!user) {
          throw new Error("user not exist or banned");
        } else {
          const access: string = await jwtSign(
            { id: user._id, name: user.userName, email: user.email },
            "15min"
          );

          res.cookie("accessTokenUser", access, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
          });
          res.cookie("refreshTokenUser", refreshTokenuser, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
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
