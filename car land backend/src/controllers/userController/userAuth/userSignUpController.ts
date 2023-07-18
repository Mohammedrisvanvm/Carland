import { Express,Request,Response } from "express";


export const userSignUpController=(req:Request,res:Response):void=>{
    console.log('hai',111);
    console.log(req.body);
    
    
res.status(200).send('get it')
}