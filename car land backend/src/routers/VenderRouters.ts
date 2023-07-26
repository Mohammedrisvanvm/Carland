import { Router } from "express";
import userRouers from "./userAuthRouters/UserAuthRouters";
import vendorAuthRouters from "../helpers/routerHelper/venderRouteHelper/venderAuthRouters";
import vendorVehicleRouters from "./vendorVehicleRouters/vendorVehicleRouters";

let router=Router()


router.use('/auth',vendorAuthRouters)
router.use('/vehicle',vendorVehicleRouters)






export default router