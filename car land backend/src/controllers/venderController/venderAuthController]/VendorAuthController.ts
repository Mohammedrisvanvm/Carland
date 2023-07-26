import { Request, Response,  } from "express";
import AsyncHandler from "express-async-handler";
import axios from "axios";
import IVender from "../../../interfaces/venderInterface";
import VenderModel from "../../../models/venderSchema";
import { jwtSign } from "../../../utils/jwtUtils/jwtutils";

interface body{
    userName:string
}
export const vendorLoginController=AsyncHandler(async (req: Request, res: Response): Promise<void> => {

    // const { email, password } = req.body.value;
     const { email, password } = req.body
    console.log(email, password, 11);

    const venderExist: IVender | null = await VenderModel.findOne({ email: req.body.email });
    console.log(venderExist);

    if (venderExist && (await venderExist.matchPassword(password))) {



        const accessToken = jwtSign(
            { id: venderExist._id, name: venderExist.userName, email: venderExist.email },
            "5s"
        );
        const refreshToken = jwtSign(
            { email: venderExist.email },
            "7d"
        );

        res.status(200).cookie("accessTokenVender", accessToken, {
            maxAge: 300000,
            httpOnly: true,
        });

        res.cookie("refreshTokenVender", refreshToken, {
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
        }).json({ vender: venderExist })
    } else {
        throw new Error("Invalid email or password");
    }
}

)
export const venderSignUpController=AsyncHandler(async (req: Request, res: Response): Promise<void> =>{

    // const { userName, email, password } = req.body.value;
    const { userName, email, password } = req.body;

    const venderExist: IVender | null = await VenderModel.findOne({ email: req.body.email });


    if (venderExist) {
        throw new Error("User Already Exists");
    } else {
       
        
        const user: {} = await VenderModel.create({
            userName,
            email,
            password,
        });
      
        
        res.status(201).json({ user });
    }
})