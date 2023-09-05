import { Request, Response,  } from "express";
import AsyncHandler from "express-async-handler";
import axios from "axios";
import IVender from "../../../interfaces/venderInterface";
import VenderModel from "../../../models/venderSchema";
import { jwtSign, verifyJwt } from "../../../utils/jwtUtils/jwtutils";
import { sendOtp } from "../../../utils/twilio/twilio";

interface body{
    userName:string
}
export const vendorLoginController=AsyncHandler(async (req: Request, res: Response): Promise<void> => {
console.log(req.body);

    
     const { email, number ,userName } = req.body.value
    console.log(email, number ,userName, 11);

    const venderExist: IVender | null = await VenderModel.findOne({ email: req.body.email });
    console.log(venderExist);

    if (venderExist ) {
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

    interface iSign {
        email: string;
        userName: string;
        number: number;
      }
    console.log(req.body);
    
    const data:iSign = req.body.values
    // const data:iSign = req.body


    const venderExist: IVender | null = await VenderModel.findOne({ email:data.email });


    if (venderExist) {
        throw new Error("User Already Exists");
    } else {
       
        
        // const user: {} = await VenderModel.create({
        //   userName:data.userName,
        //   email:data.email,
        //   phoneNumber:data.number
        // });
        let response:number=await sendOtp(data.number)
        console.log(response);
        
       let Token = jwtSign({token:response,user:data.number},"5min")
      res.status(200).cookie("vendorOtpToken",Token,{ httpOnly: true,maxAge:300000 }).json({message:"hello"})
    }
})
interface VendorJwt{
    payload:{
        token?:number,
        user?:number
    }|null;
    expired:boolean
}
interface vendorbody{
value:number
}
export const vendorOtpverify=AsyncHandler(async (req: Request, res: Response): Promise<void> =>{
    const vendorOtpToken:string = req.cookies?.vendorOtpToken;
    console.log(vendorOtpToken,req.body);
    const data:vendorbody=req.body
    if(vendorOtpToken){
        const verify:VendorJwt=verifyJwt(vendorOtpToken)
        if(verify?.payload?.token==data.value){

            res.status(201).json({user:"risvan"})
        }
        
    }
})