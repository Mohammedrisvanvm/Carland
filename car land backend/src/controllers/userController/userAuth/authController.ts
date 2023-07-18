import { Express, Request, Response } from "express";
import userModel from "../../../models/userSchema";
import { IUser } from "../../../interfaces/userInterface";



export const userSignUpController = async (req: Request, res: Response): Promise<void> => {

    // const { userName, email, password } = req.body.value
    const { userName, email, password } = req.body

    console.log(userName, email, password);

    const userExist: any = await userModel.findOne({ email })

    if (userExist) {
        res.status(200).json({
            error: true,
            message: "email is not available"
        })

    } else {
        const user: {} = await userModel.create({
            userName,
            email,
            password
        })



        res.status(201).json({ user })
    }
}
export const userLoginController = async (req: Request, res: Response): Promise<void> => {
    // const { email, password } = req.body
    const { email, password } = req.body.value;
    console.log(email,password);
    
    const userExist: IUser | null = await userModel.findOne({ email });

    if (userExist && (await userExist.matchPassword(password))) {
        res.status(200).json({ user:userExist });
    } else {
        res.status(401).json({
            error: true,
            message: "Invalid email or password",
        });
    }
};

