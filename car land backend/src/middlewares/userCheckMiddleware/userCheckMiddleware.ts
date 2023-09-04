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
export const userCheck = AsyncHandler( async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken:string = req.cookies?.accessToken;
    const refreshToken:string = req.cookies?.refreshToken;
console.log(accessToken,refreshToken);

if (accessToken && refreshToken) {
     console.log("hai");

     next()
  
  } else if (!accessToken) {
    const verifiedJWT: IVerifyjwt = verifyJwt(refreshToken);

    if (verifiedJWT) {
      const user: IUser | null = await userModel.findOne(
        { email: verifiedJWT.payload?.email },
        { password: 0 }
      );

      if (!user) {
        throw new Error("user not exist");
      }
      const access = await jwtSign(
        { id: user._id, name: user.userName, email: user.email },
        "30s"
      );

      const Ref = await jwtSign({ email: user.email }, "7d");
      res.cookie("accessToken", access, { httpOnly: true, maxAge: 5000 });
      next()
      }
  } else {
   throw new Error("token is not avialable");
  }
})
