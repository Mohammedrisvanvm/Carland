"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/userController/userAuth/authController");
// import { userCheck } from "../../middlewares/userCheckMiddleware/userCheckMiddleware";
const userAuthRouters = (0, express_1.Router)();
userAuthRouters.post('/userSignUp', authController_1.userSignUpController);
userAuthRouters.post('/userotpcheck', authController_1.userOtpverify);
userAuthRouters.post('/userLogin', authController_1.userLoginController);
userAuthRouters.get('/userLogout', authController_1.userLogoutController);
userAuthRouters.post('/userGoogleAuth', authController_1.userGoogleAuth);
userAuthRouters.get('/userCheck', authController_1.userCheck);
exports.default = userAuthRouters;
//# sourceMappingURL=UserAuthRouters.js.map