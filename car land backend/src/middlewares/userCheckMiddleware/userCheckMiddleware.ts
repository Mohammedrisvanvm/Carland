import { Request, Response, NextFunction } from "express"
import { jwtSign, verifyJwt } from "../../utils/jwtUtils/jwtutils"
import { AuthenticatedRequest } from "../../interfaces/authentication.request"
import { getSession } from "../../helpers/sessionController/sessionController"

export const userCheck = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies
    if (!accessToken) {
        return next()
    }

    const { payload, expired } = verifyJwt(accessToken)
    if (payload) {
        req.user = payload
        return next()
    }

    const { payload : refresh } = expired && refreshToken ? verifyJwt(refreshToken) : { payload: null }

    if (!refresh) {
        return next()
    }
    console.log(refresh,111111);
    
    const session:any = getSession(refresh.sessionId)
    if(session){
        return next()
    }
const newAccessToken=jwtSign(session,'5s')
res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
    });
    req.user=verifyJwt(newAccessToken).payload
    return next()
}

