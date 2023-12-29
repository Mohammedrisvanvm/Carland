"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VendorAuthController_1 = require("../../controllers/venderController/VendorAuthController");
const vendorAuthRouters = (0, express_1.Router)();
vendorAuthRouters.post("/vendorlogin", VendorAuthController_1.vendorLoginController);
vendorAuthRouters.post("/vendorsignup", VendorAuthController_1.venderSignUpController);
vendorAuthRouters.post("/vendorotpverify", VendorAuthController_1.vendorOtpverify);
vendorAuthRouters.get("/vendorlogout", VendorAuthController_1.vendorLogOut);
exports.default = vendorAuthRouters;
//# sourceMappingURL=vendorAuthRouters.js.map