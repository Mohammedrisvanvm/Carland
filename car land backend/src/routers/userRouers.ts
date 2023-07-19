import { Router } from "express";
import userRouers from "./userAuthRouters/UserAuthRouters";
import { userCheck } from "../middlewares/userCheckMiddleware/userCheckMiddleware";

let router=Router()


router.use('/auth',userCheck,userRouers)






export default router