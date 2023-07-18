import { Router } from "express";
import { userSignUp } from "./userAuthRouters/UserAuthRouters";

let router=Router()


router.use('/auth',userSignUp)






export default router