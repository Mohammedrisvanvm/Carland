import { Router } from "express";
import vendorAuthRouters from "./vendorRouters/vendorAuthRouters";
import vendorVehicleRouters from "./vendorRouters/vendorVehicleRouters";
import hubRouters from "./vendorRouters/hubRouters";


let router = Router();

router.use("/auth", vendorAuthRouters);
router.use("/vehicle", vendorVehicleRouters);
router.use("/hub", hubRouters);

export default router;
