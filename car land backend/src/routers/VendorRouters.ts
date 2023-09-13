import { Router } from "express";
import vendorAuthRouters from "./vendorRouters/vendorAuthRouters";
import vendorVehicleRouters from "./vendorRouters/vendorVehicleRouters";
import hubRouters from "./vendorRouters/hubRouters";
import { vendorAuthenticate } from "../middlewares/Authorization/vendor";

let router = Router();

router.use("/auth", vendorAuthRouters);
router.use("/vehicle", vendorAuthenticate, vendorVehicleRouters);
router.use("/hub", vendorAuthenticate, hubRouters);

export default router;
