import { Router } from "express";
import {
  venderSignUpController,
  vendorLogOut,
  vendorLoginController,
  vendorOtpverify,
} from "../../../controllers/venderController/venderAuthController/VendorAuthController";
const vendorAuthRouters = Router();

vendorAuthRouters.post("/vendorlogin", vendorLoginController);
vendorAuthRouters.post("/vendorsignup", venderSignUpController);
vendorAuthRouters.post("/vendorotpverify", vendorOtpverify);
vendorAuthRouters.get("/vendorlogout", vendorLogOut);

export default vendorAuthRouters;
