import { Router } from "express";
import userRouers from "./userAuthRouters/UserAuthRouters";

let router=Router()


router.use('/auth',userRouers)






export default router