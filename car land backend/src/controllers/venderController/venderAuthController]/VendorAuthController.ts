import { Request, Response,  } from "express";
import AsyncHandler from "express-async-handler";
import axios from "axios";


export const vendorLoginController=AsyncHandler(async (req: Request, res: Response): Promise<void> => {

res.send('hai')

})