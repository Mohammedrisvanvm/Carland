import { Router } from "express";
import { userCheck, userGoogleAuth, userLoginController, userLogoutController, userSignUpController } from "../../controllers/userController/userAuth/authController";
// import { userCheck } from "../../middlewares/userCheckMiddleware/userCheckMiddleware";

const userRouers=Router()

userRouers.post('/userSignUp',userSignUpController)
userRouers.post('/userLogin',userLoginController)
userRouers.get('/userLogout',userLogoutController)
userRouers.post('/userGoogleAuth',userGoogleAuth)
userRouers.get('/userCheck',userCheck)



export default userRouers