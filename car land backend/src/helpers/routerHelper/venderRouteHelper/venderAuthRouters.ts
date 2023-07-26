import { Router } from "express";
import { venderSignUpController, vendorLoginController } from "../../../controllers/venderController/venderAuthController]/VendorAuthController";
const vendorAuthRouters=Router()

vendorAuthRouters.get('/vendorLogin',vendorLoginController)
vendorAuthRouters.post('/vendorSignup',venderSignUpController)



export default vendorAuthRouters