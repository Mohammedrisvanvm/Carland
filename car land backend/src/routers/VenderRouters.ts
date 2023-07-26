import { Router } from "express";
import userRouers from "./userAuthRouters/UserAuthRouters";
import vendorAuthRouters from "../helpers/routerHelper/venderRouteHelper/venderAuthRouters";

let router=Router()


router.use('/auth',vendorAuthRouters)






export default router