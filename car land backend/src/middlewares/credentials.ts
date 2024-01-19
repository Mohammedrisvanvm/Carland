import type { NextFunction, Request, Response } from "express";
export const allowedOrigins = [
  "http://localhost:3000",
  "https://carlandpro.netlify.app",
];

const credentials=(req:Request,res:Response,next:NextFunction)=>{
    if(allowedOrigins.includes(req.headers.origin)){
        res.header('Access-Control-Allow-Credentials',"true")
    }
    next()
}
export default credentials
