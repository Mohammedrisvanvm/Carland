import { Router } from "express";
import userCarRouters from "./userAuthRouters/UserCarRoutes";
import userAuthRouters from "./userAuthRouters/UserAuthRouters";
import userStuffController from "./userAuthRouters/UserStuffContoller";
import { userAuthenticate } from "../middlewares/Authorization/user";

let router=Router()


router.use('/auth',userAuthRouters)
router.use('/vehicle',userCarRouters)
router.use('/stuff',userAuthenticate,userStuffController)






export default router