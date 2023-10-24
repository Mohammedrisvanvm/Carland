import { Router } from "express";
import userCarRouters from "./userAuthRouters/UserCarRoutes";
import userAuthRouters from "./userAuthRouters/UserAuthRouters";
import userStuffController from "./userAuthRouters/UserStuffContoller";
import { userAuthenticate } from "../middlewares/Authorization/user";
import UserBooking from "./userAuthRouters/UserBooking";

const router=Router()


router.use('/auth',userAuthRouters)
router.use('/vehicle',userCarRouters)
router.use('/stuff',userAuthenticate,userStuffController)
router.use('/booking',userAuthenticate,UserBooking)






export default router