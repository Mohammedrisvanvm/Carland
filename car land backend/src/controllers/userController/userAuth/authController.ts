import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import userModel from "../../../models/userSchema";
import { jwtSign, verifyJwt } from "../../../utils/jwtUtils/jwtutils";
import IUser from "../../../interfaces/userInterface";
import axios from "axios";
import  { MailServiceOtp } from "../../../utils/nodeMailer/otp";
import { getotp } from "../../../utils/twilio/twilio";

export const userSignUpController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface iSign {
      email: string;
      userName: string;
      password: string;
    }
    const data: iSign = req.body.value;
    // const data: iSign = req.body;

    const userExist: IUser | null = await userModel.findOne({
      email: data.email,
    });

    if (userExist) {
      throw new Error("User Already Exists");
    } else {
      const otp = getotp();
      MailServiceOtp(data.email, otp);

      const Token = jwtSign({ token: otp, user: data }, "5min");
      res
        .status(200)
        .cookie("UserOtpToken", Token, { httpOnly: true, maxAge: 300000 })
        .json({ message: "message otp sented" });
    }
  }
);
interface UserJwt {
  payload?: {
    token?: number;
    user?: {
      id:string
      userName: string;
      email: string;
      number?: number | null;
      password?: string;
    };
  } | null;
  expired: boolean;
}
export const userOtpverify = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const UserOtpToken: string = req.cookies?.UserOtpToken;

      const data: number = req.body.value;

  

      if (UserOtpToken) {
        const { payload }: UserJwt = verifyJwt(UserOtpToken);

        if (payload?.token == data) {
          let userExist: IUser | null = await userModel.findOne({
            email: payload.user?.email,
          });
    

          if (!userExist) {
            const user: IUser = await userModel.create({
              userName: payload.user?.userName,
              email: payload.user?.email,
              phoneNumber: payload.user?.number,
              password: payload.user?.password,
            });
            userExist = user;
          }

          const accessToken = jwtSign(
            {
              user: {
                id: userExist?._id,
                name: userExist?.userName,
                email: userExist?.email,
              },
            },
            "15min"
          );
          const refreshToken = jwtSign({ id: userExist?._id }, "7d");

          res.status(200).cookie("accessTokenUser", accessToken, {
            maxAge: 900000,
            httpOnly: true,
          });

          res
            .cookie("refreshTokenUser", refreshToken, {
              maxAge: 7 * 24 * 60 * 60,
              httpOnly: true,
            })
            .json({ user: userExist, accessToken });
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
export const userLoginController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface data {
      email?: string;
      password?: string;
    }

    // const data: data = req.body;
    const data: data = req.body.value;


    const userExist: IUser | null = await userModel.findOne({
      email: data.email,
      ban: false,
    });

    if (userExist) {
      if (userExist && (await userExist.matchPassword(data.password))) {
        

        const token: number = getotp();
        const userOtpToken = jwtSign(
          {
            token: token,
            user: {
              email: userExist.email,
            },
          },
          "15min"
        );
        MailServiceOtp(userExist.email, token);
        res
          .status(200)
          .cookie("UserOtpToken", userOtpToken, {
            maxAge: 300000,
            httpOnly: true,
          })
          .json({ message: "user otp sented" });
      } else {
        throw new Error("invalid user name or password");
      }
    } else {
      throw new Error("user not exist or banned");
    }
  }
);

export const userGoogleAuth = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    interface Token {
      access_token: string;
    }
    const Token: Token = req.body.value;

    if (Token) {
      interface Email {
        data:
          | {
              name: string;
              email: string;
              id: string;
              picture: string;
              verified_email: boolean;
            }
          | undefined;
      }
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token.access_token}`
        )
        .then(async (response: Email) => {
          const olduser: IUser | null = await userModel.findOne({
            email: response.data?.email,
          });
          if (olduser) {
            await userModel.findByIdAndUpdate(olduser._id, {
              $set: {
                email: response.data?.email,
                googleId: response.data?.id,
                image: response.data?.picture,
                verified_email: response.data?.verified_email,
              },
            });

            const newUser: IUser | null = await userModel.findOne({
              email: response.data?.email,
            });
            const accessToken = jwtSign(
              {
                user: {
                  id: newUser?._id,
                  name: newUser?.userName,
                  email: newUser?.email,
                },
              },
              "15min"
            );
            const refreshToken = jwtSign({ id: newUser?._id }, "7d");

            res.status(200).cookie("accessTokenUser", accessToken, {
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
            });

            res
              .cookie("refreshTokenUser", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
              })
              .json({
                user: newUser,
                accessToken,
                message: `welcome back ${newUser?.userName} `,
              });
          } else {
            const user: IUser | null = await userModel.create({
              userName: response.data?.name,
              email: response.data?.email,
              googleId: response.data?.id,
              image: response.data?.picture,
              verified_email: response.data?.verified_email,
            });
            const accessToken = jwtSign(
              {
                user: { id: user._id, name: user.userName, email: user.email },
              },
              "15min"
            );
            const refreshToken = jwtSign({ email: user.email }, "7d");

            res.status(200).cookie("accessTokenUser", accessToken, {
              maxAge: 1000 * 60 * 60 * 24,
              httpOnly: true,
            });

            res
              .cookie("refreshTokenUser", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24*7,
                httpOnly: true,
              })
              .json({ user, accessToken, message: "created" });
          }
        });
    }
  }
);

export const userLogoutController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.cookie("accessTokenUser", "", { httpOnly: true, maxAge: 0 });
    res
      .cookie("refreshTokenUser", "", { httpOnly: true, maxAge: 0 })
      .status(200)
      .json({ message: "logout user" });
  }
);

interface IVerifyjwt {
  payload?: {
    email?: string;
  } | null;
  expired: boolean;
}
export const userCheck = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log(req.cookies);

    const accessToken: string = req.cookies?.accessTokenUser;
    const refreshToken: string = req.cookies?.refreshTokenUser;

    console.log(accessToken, refreshToken);

    if (!accessToken) {
      const verifiedJWT: IVerifyjwt = verifyJwt(refreshToken);
      console.log(verifiedJWT);

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
        res.cookie("accessTokenUser", access, { httpOnly: true, maxAge: 5000 });
        res
          .cookie("refreshTokenUser", Ref, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60,
          })
          .json({ user });
      } else {
        throw new Error("token is not avialable");
      }
    } else {
      const verify: IVerifyjwt = verifyJwt(refreshToken);
      const data: IUser | null = await userModel.findOne(
        { email: verify.payload?.email },
        { password: 0 }
      );
      res.json({ user: data, message: "token available" });
    }
  }
);
