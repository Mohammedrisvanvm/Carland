import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import IAdmin from "../../interfaces/adminInterface";
import adminModel from "../../models/adminSchema";
import { jwtSign } from "../../utils/jwtUtils/jwtutils";

export const adminAuth = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface IADMINB {
      email: string;
      password: string;
    }
    try {
      let data: IADMINB = req.body.values;


      const response: IAdmin | null = await adminModel.findOne({
        email: data.email,
      })
      if(response && (await response.matchPassword(data.password))){

        const accessToken = jwtSign(
            { id: response._id, email: response.email },
            "15m"
          );
          const refreshToken = jwtSign({ email: response.email }, "7d");
    
          res.status(200).cookie("accessToken", accessToken, {
            maxAge: 300000,
            httpOnly: true,
          });
    
          res
            .cookie("refreshToken", refreshToken, {
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
