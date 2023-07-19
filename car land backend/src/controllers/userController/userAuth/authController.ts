import {  Request, Response } from "express";
import userModel from "../../../models/userSchema";
import { IUser } from "../../../interfaces/userInterface";
import AsyncHandler from "express-async-handler";
import { jwtSign } from "../../../utils/jwtUtils/jwtutils";



export const userSignUpController = AsyncHandler(async(req: Request, res: Response): Promise<void> => {

    const { userName, email, password } = req.body.value
    // const { userName, email, password } = req.body

    console.log(userName, email, password);

    const userExist: any = await userModel.findOne({ email })

    if (userExist) {
      throw new Error ('User Already Exists')
    } else {
        const user: {} = await userModel.create({
            userName,
            email,
            password
        })



        res.status(201).json({ user })
    }
})
export const userLoginController = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body
    // const { email, password } = req.body.value;
    console.log(email,password);
    
    const userExist: IUser | null = await userModel.findOne({ email });


    if (userExist && (await userExist.matchPassword(password))) {
console.log("hai");

        const accesstoken= await jwtSign({id:userExist._id,name:userExist.userName,email:userExist.email},'1hr')
        console.log(accesstoken);
        res.status(200).json({ user:userExist });
    } else {
      throw new Error ('Invalid email or password')
    }
})

