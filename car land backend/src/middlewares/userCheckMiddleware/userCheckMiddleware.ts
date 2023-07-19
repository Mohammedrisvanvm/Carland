import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../../utils/jwtUtils/jwtutils"
import { AuthenticatedRequest } from "../../interfaces/authentication.request"
export const userCheck = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies
    if (!accessToken) {
        return next()
    }

    const { payload } = verifyJwt(accessToken)
    if (payload) {
        req.user = payload
        return next()
    }
}

