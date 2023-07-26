import { Router } from "express";
import { vendorLoginController } from "../../../controllers/venderController/venderAuthController]/VendorAuthController";
const vendorAuthRouters=Router()

vendorAuthRouters.get('/vendorLogin',vendorLoginController)



export default vendorAuthRouters