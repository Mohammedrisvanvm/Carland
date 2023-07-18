import { Router } from "express";
import { userSignUp } from "./userAuthRouters/UserAuthRouters";

let router=Router()


router.post('/auth',userSignUp)






export default router