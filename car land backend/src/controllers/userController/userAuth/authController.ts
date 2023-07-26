import { Request, Response,  } from "express";
import userModel from "../../../models/userSchema";
import AsyncHandler from "express-async-handler";
import { jwtSign, verifyJwt } from "../../../utils/jwtUtils/jwtutils";
import IUser from "../../../interfaces/userInterface";
import axios from "axios";
import { MongooseOptions } from "mongoose";

export const userSignUpController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { userName, email, password } = req.body.value;
        // const { userName, email, password } = req.body

        console.log(userName, email, password);

        const userExist: any = await userModel.findOne({ email });

        if (userExist) {
            throw new Error("User Already Exists");
        } else {
            const user: {} = await userModel.create({
                userName,
                email,
                password,
            });
            res.status(201).json({ user });
        }
    }
);
export const userLoginController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        console.log('hoi1');
        // const { email, password } = req.body;
        const { email, password } = req.body.value;
        console.log(email, password, 11);

        const userExist: IUser | null = await userModel.findOne({ email: req.body.value.email });
        console.log(userExist);

        if (userExist && (await userExist.matchPassword(password))) {



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

    console.log('hoi2');
    if (req.body.value.access_token) {
        const access_token: string = req.body.value.access_token
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`).then(async (response: any) => {
            const email: string = response.data.email
            let olduser: any = await userModel.findOne({ email })
            if (olduser) {
                await userModel.findByIdAndUpdate(olduser._id, {
                    $set: {
                        email: response.data.email,
                        googleId: response.data.id,
                        image: response.data.picture,
                        verified_email: response.data.verified_email
                    }
                });

                olduser = await userModel.findOne({ email })
                const accessToken = jwtSign(
                    { id: olduser._id, name: olduser.userName, email: olduser.email },
                    "5s"
                );
                const refreshToken = jwtSign(
                    { email: olduser.email },
                    "7d"
                );

                res.status(200).cookie("accessToken", accessToken, {
                    maxAge: 300000,
                    httpOnly: true,
                });

                res.cookie("refreshToken", refreshToken, {
                    maxAge: 7 * 24 * 60 * 60,
                    httpOnly: true,
                }).json({ olduser, message: `welcome back ${olduser.userName} ` })

            } else {
                const user = await userModel.create({
                    userName: response.data.name,
                    email: response.data.email,
                    googleId: response.data.id,
                    image: response.data.picture,
                    verified_email: response.data.verified_email
                })
                const accessToken = jwtSign(
                    { id: user._id, name: user.userName, email: user.email },
                    "5s"
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
export const userCheck = AsyncHandler(
    async (req: Request, res: Response): Promise<any> => {

        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if (!accessToken) {
            const verifiedJWT = verifyJwt(refreshToken)


            if (verifiedJWT) {

                const user: IUser | null = await userModel.findOne({ email: verifiedJWT.payload.email }, { password: 0 });


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
            const verify = verifyJwt(accessToken)
            const user: IUser | null = await userModel.findOne(verify.payload.email, { password: 0 });

            res.json({ user, message: 'token available' })
        }
    }

);