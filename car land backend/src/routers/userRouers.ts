import { Router } from "express";
import userCarRouters from "./userAuthRouters/UserCarRoutes";
import userAuthRouters from "./userAuthRouters/UserAuthRouters";

let router=Router()


router.use('/auth',userAuthRouters)
router.use('/vehicle',userCarRouters)






export default router