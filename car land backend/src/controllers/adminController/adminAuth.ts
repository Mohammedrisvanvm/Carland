import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IAdmin from "../../interfaces/adminInterface";
import adminModel from "../../models/adminSchema";
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils";

export const adminLogin = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface IADMINB {
      email: string;
      password: string;
      
    }

    const data: IADMINB = req.body.values;
    // const data: IADMINB = req.body

    const response: IAdmin | null = await adminModel.findOne({
      email: data.email,
    });
  

    if (response && (await response.matchPassword(data.password))) {

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
        .json({ admin: response,accessToken:accessToken });
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

interface IVerifyjwt {
  payload?: {
    email?: string;
  };
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

export const adminLogout = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("accessTokenAdmin", "", { httpOnly: true, maxAge: 0 });
    res
      .cookie("refreshTokenAdmin", "", { httpOnly: true, maxAge: 0 })
      .json({ message: "admin Logouted" });
  }
);
