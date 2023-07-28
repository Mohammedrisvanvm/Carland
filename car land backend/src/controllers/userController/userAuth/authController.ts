import { Request, Response, } from "express";
import userModel from "../../../models/userSchema";
import AsyncHandler from "express-async-handler";
import { jwtSign, verifyJwt } from "../../../utils/jwtUtils/jwtutils";
import IUser from "../../../interfaces/userInterface";
import axios from "axios";
import { MongooseOptions } from "mongoose";

export const userSignUpController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        interface iSign{
   
        email:string
        userName:string,
         password:string
    
        }
        const data:iSign= req.body.value;
      

     

        const userExist: IUser | null = await userModel.findOne({ email:data.email});

        if (userExist) {
            throw new Error("User Already Exists");
        } else {
            const user: {} = await userModel.create({
                userName:data.userName,
                email:data.email,
                password:data.password,
            });
            res.status(201).json({ user });
        }
    }
);
export const userLoginController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        interface data {
            email?: string,
            password?: string
        }
        const data: data = req.body.value;
   

        const userExist: IUser | null = await userModel.findOne({ email: data.email });
   

        if (userExist && (await userExist.matchPassword(data.password))) {



            const accessToken = jwtSign(
                { id: userExist._id, name: userExist.userName, email: userExist.email },
                "5s"
            );
            const refreshToken = jwtSign(
                { email: userExist.email },
                "7d"
            );

            res.status(200).cookie("accessToken", accessToken, {
                maxAge: 300000,
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                maxAge: 7 * 24 * 60 * 60,
                httpOnly: true,
            }).json({ user: userExist })
        } else {
            throw new Error("Invalid email or password");
        }
    }
);

export const userGoogleAuth = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    interface Token {
        access_token: string
    }
    const Token: Token = req.body.value
 
  
    if (Token) {
        interface Email {
            data: {
                name: string
                email: string
                id: string,
                picture: string,
                verified_email: boolean
            } | undefined
        }
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Token.access_token}`).then(async (response: Email) => {


            const olduser: IUser | null = await userModel.findOne({ email: response.data?.email })
            if (olduser) {
                await userModel.findByIdAndUpdate(olduser._id, {
                    $set: {
                        email: response.data?.email,
                        googleId: response.data?.id,
                        image: response.data?.picture,
                        verified_email: response.data?.verified_email
                    }
                });

                const newUser: IUser | null = await userModel.findOne({ email: response.data?.email })
                const accessToken = jwtSign(
                    { id: newUser?._id, name: newUser?.userName, email: newUser?.email },
                    "5s"
                );
                const refreshToken = jwtSign(
                    { email: newUser?.email },
                    "7d"
                );

                res.status(200).cookie("accessToken", accessToken, {
                    maxAge: 300000,
                    httpOnly: true,
                });

                res.cookie("refreshToken", refreshToken, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                }).json({ newUser, message: `welcome back ${newUser?.userName} ` })

            } else {
                const user: IUser | null = await userModel.create({
                    userName: response.data?.name,
                    email: response.data?.email,
                    googleId: response.data?.id,
                    image: response.data?.picture,
                    verified_email: response.data?.verified_email
                })
                const accessToken = jwtSign(
                    { id: user._id, name: user.userName, email: user.email },
                    "30s"
                );
                const refreshToken = jwtSign(
                    { email: user.email },
                    "7d"
                );

                res.status(200).cookie("accessToken", accessToken, {
                    maxAge: 300000,
                    httpOnly: true,
                });

                res.cookie("refreshToken", refreshToken, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                }).json({ user, message: 'created' })
            }

        })
    }
})



export const userLogoutController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

        res.cookie('accessToken', '', { httpOnly: true, maxAge: 0 })
        res
            .cookie('refreshToken', '', { httpOnly: true, maxAge: 0 })
            .status(200)
            .json({ message: 'logout user' })

    })

interface IVerifyjwt {
    payload:{
        email:string
    }|null,
    expired: boolean,
}
export const userCheck = AsyncHandler(
    async (req: Request, res: Response): Promise<any> => {
  
console.log("hiu");

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken) {
            const verifiedJWT: IVerifyjwt = verifyJwt(refreshToken)
          


            if (verifiedJWT) {

                const user: IUser | null = await userModel.findOne({ email: verifiedJWT.payload?.email }, { password: 0 });


                if (!user) {
                    throw new Error('user not exist')

                }
                const access = await jwtSign({ id: user._id, name: user.userName, email: user.email }, '5s')


                const Ref = await jwtSign({ email: user.email }, '7d')
                res.cookie('accessToken', access, { httpOnly: true, maxAge: 5000 })
                res.cookie('refreshToken', Ref, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 }).json({ user })

            } else {
                throw new Error("token is not avialable");

            }
        } else {
            const verify:IVerifyjwt = verifyJwt(accessToken)
            const data: IUser | null = await userModel.findOne({ email: verify.payload?.email }, { password: 0 });

            res.json({ user:data, message: 'token available' })
        }
    }

);