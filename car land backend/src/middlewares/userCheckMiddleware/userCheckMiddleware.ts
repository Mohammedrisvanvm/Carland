import { Request, Response, NextFunction } from "express";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";
import { AuthenticatedRequest } from "../../interfaces/authentication.request";
import userModel from "../../models/userSchema";
import IUser from "../../interfaces/userInterface";
import AsyncHandler from "express-async-handler";

interface IVerifyjwt {
  payload: {
    email: string;
  } | null;
  expired: boolean;
}
export const userCheck = AsyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const accessToken: string = req.cookies?.accessToken;

    if (accessToken) {
      const verifiedJWT: IVerifyjwt = verifyJwt(accessToken);
      if (verifiedJWT) next();
    }else{
      next()
    }
  }
);
