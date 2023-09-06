import { Router } from "express";
import { venderSignUpController, vendorLoginController, vendorOtpverify } from "../../../controllers/venderController/venderAuthController]/VendorAuthController";
const vendorAuthRouters=Router()

vendorAuthRouters.post('/vendorlogin',vendorLoginController)
vendorAuthRouters.post('/vendorsignup',venderSignUpController)
vendorAuthRouters.post('/vendorotpverify',vendorOtpverify)



export default vendorAuthRouters