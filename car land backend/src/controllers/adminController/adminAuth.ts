import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";


export const adminAuth=AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
console.log(req.body);

       res.send(req.body)
    })