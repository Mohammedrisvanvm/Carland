import { Router } from "express";
import userRouters from "./userAuthRouters/UserAuthRouters";

let router=Router()


router.use('/auth',userRouters)






export default router