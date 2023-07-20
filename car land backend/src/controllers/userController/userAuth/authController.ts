import { Request, Response } from "express";
import userModel from "../../../models/userSchema";

import AsyncHandler from "express-async-handler";
import { jwtSign } from "../../../utils/jwtUtils/jwtutils";
import { createSession } from "../../../helpers/sessionController/sessionController";
import IUser from "../../../interfaces/userInterface";

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
    async (req: Request, res: Response): Promise<any> => {
        // const { email, password } = req.body;
        const { email, password } = req.body.value;
        console.log(email, password, 11);

        const userExist: IUser | null = await userModel.findOne({ email: req.body.value.email });
        console.log(userExist);

        if (userExist && (await userExist.matchPassword(password))) {

            const session = createSession(email, userExist.userName)

            const accessToken = jwtSign(
                { id: userExist._id, name: userExist.userName, email: userExist.email, sessionId: session.sessionId },
                "5s"
            );
            const refreshToken = jwtSign(
                { sessionId: session.sessionId },
                "1y"
            );

            res.status(200)
                .cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true })
                .cookie("refreshToken", refreshToken, { maxAge: 3.154e10, httpOnly: true })
                .json({ user: userExist })

        } else {
            throw new Error("Invalid email or password");
        }
    }
);

export const userGoogleAuth = AsyncHandler(async (req: Request, res: Response): Promise<any> => {

    console.log(req.body.value);
    
    // const { email, password, name, token, googleId } = req.body.value;
    // const { accessToken, refreshToken } = req.cookies


    // console.log(email, password, accessToken, refreshToken)

    // try {
    //     const olduser = await userModel.findOne({ email })
    //     if (olduser) {
    //         const result = { _id: olduser._id.toString(), name, email }
    //         return res.status(200).json({ result, token })
    //     }

    //     const result=await userModel.create({
    //         email,
    //         name,
    //         googleId
    //     })
    //     return res.status(201).json({user:result,token})
    // } catch (error) {

    // }
})


export const userLogoutController = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        res.cookie('accessToken', '', { httpOnly: true, maxAge: 0 })
        res
            .cookie('refreshToken', '', { httpOnly: true, maxAge: 0 })
            .status(200)
            .json({ message: 'logout user' })

    })