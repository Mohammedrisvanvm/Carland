import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import IAdmin from "../../interfaces/adminInterface";
import adminModel from "../../models/adminSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";

export const adminLogin= AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface IADMINB {
      email: string;
      password: string;
    }
    try {
      const data: IADMINB = req.body.values;


      const response: IAdmin | null = await adminModel.findOne({
        email: data.email,
      });
    console.log(response);
    
      
      if (response && (await response.matchPassword(data.password))) {
        console.log("hai");
        
        const accessToken = jwtSign(
          { id: response._id, email: response.email },
          "15m"
        );
        const refreshToken = jwtSign({ email: response.email }, "7d");

        res.status(200).cookie("accessTokenAdmin", accessToken, {
          maxAge: 300000,
          httpOnly: true,
        });

        res
          .cookie("refreshTokenAdmin", refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
          })
          .json({ admin: response });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

interface IVerifyjwt {
  payload: {
    email?: string;
  } | null;
  expired: boolean;
}
export const adminCheck = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const accessTokenAdmin = req.cookies?.accessTokenAdmin;
    const refreshTokenAdmin = req.cookies?.refreshTokenAdmin;

    if (accessTokenAdmin) {
      res.json({ isLoggedin: true });
    } else if (refreshTokenAdmin) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshTokenAdmin);
      const access = jwtSign({ email: verifiedJWT.payload?.email }, "15min");
      res.cookie("accessTokenAdmin", access, { httpOnly: true, maxAge: 5000 });
      res
        .cookie("refreshTokenAdmin", refreshTokenAdmin, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60,
        })
        .json({ isloggedin: true });
    } else {
      res.json({ isLoggedin: false });
    }
  }
);
