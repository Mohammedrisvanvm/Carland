import { Router } from "express";
import { userCheck, userGoogleAuth, userLoginController, userLogoutController, userSignUpController } from "../../controllers/userController/userAuth/authController";
// import { userCheck } from "../../middlewares/userCheckMiddleware/userCheckMiddleware";

const userRouters=Router()

userRouters.post('/userSignUp',userSignUpController)
userRouters.post('/userLogin',userLoginController)
userRouters.get('/userLogout',userLogoutController)
userRouters.post('/userGoogleAuth',userGoogleAuth)
userRouters.get('/userCheck',userCheck)



export default userRouters