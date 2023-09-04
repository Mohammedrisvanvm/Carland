import { Router } from "express";
import { venderSignUpController, vendorLoginController } from "../../../controllers/venderController/venderAuthController]/VendorAuthController";
const vendorAuthRouters=Router()

vendorAuthRouters.get('/vendorlogin',vendorLoginController)
vendorAuthRouters.post('/vendorsignup',venderSignUpController)



export default vendorAuthRouters