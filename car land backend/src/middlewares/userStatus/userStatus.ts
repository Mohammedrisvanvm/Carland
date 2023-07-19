
import { NextFunction } from 'express'
import { AuthenticatedResponse } from '../../interfaces/AuthenticatedResponse'
import { AuthenticatedRequest } from '../../interfaces/authentication.request'

export const userStatus=(req:AuthenticatedRequest,res:AuthenticatedResponse,next:NextFunction)=>{
if(!req.user){
return res.status(403).send('invalid session')
}
return next()
}