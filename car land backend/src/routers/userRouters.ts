import { Router } from "express";
import userCarRouters from "./userAuthRouters/UserCarRoutes";
import userAuthRouters from "./userAuthRouters/UserAuthRouters";
import userStuffController from "./userAuthRouters/UserStuffContoller";

let router=Router()


router.use('/auth',userAuthRouters)
router.use('/vehicle',userCarRouters)
router.use('/stuff',userStuffController)






export default router