import { Router } from "express";
import { userCheck, userGoogleAuth, userLoginController, userLogoutController, userOtpverify, userSignUpController } from "../../controllers/userController/userAuth/authController";
// import { userCheck } from "../../middlewares/userCheckMiddleware/userCheckMiddleware";

const userAuthRouters=Router()

userAuthRouters.post('/userSignUp',userSignUpController)
userAuthRouters.post('/userotpcheck',userOtpverify)
userAuthRouters.post('/userLogin',userLoginController)
userAuthRouters.get('/userLogout',userLogoutController)
userAuthRouters.post('/userGoogleAuth',userGoogleAuth)
userAuthRouters.get('/userCheck',userCheck)



export default userAuthRouters