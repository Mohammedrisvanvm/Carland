import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
export const verifyNumber = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

console.log(req.cookies);
const number:number=req.body.phoneNumber
res.json({message:"otp sented"})
    })
export const verifyOtp = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

console.log(req.cookies);
const otp:number=req.body.otp
res.json({message:'verified'})
    })