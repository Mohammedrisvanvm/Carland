import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
export const addhub = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    
    res.json({message:"access get"})
})