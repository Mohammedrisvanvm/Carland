import { Express, Request, Response } from "express";
import userModel from "../../../models/userSchema";


export const userSignUpController = async (req: Request, res: Response): Promise<void> => {

    const { userName, email, password } = req.body.value
    // const { email, password } = req.body
    console.log(userName, email, password );
    
    const userExist: any = await userModel.findOne({ email })

    if (userExist) {
        res.status(200).json({
            error: true,
            message: "email is not available"
        })

    }else{
        const user: {} = await userModel.create({
            userName,
            email,
            password
        })
    
    
    
        res.status(201).json({ user })
    }
    }

  