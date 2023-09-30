import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
export const bookCar = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        type Idates = { pickUpDate: string; dropDate: string,time:string }
        const {pickUpDate,dropDate,time}:Idates=req.body.data
       console.log(pickUpDate,dropDate,time,req.headers.authorization);
       
    })