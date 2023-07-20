import { Router } from "express";
import { userGoogleAuth, userLoginController, userLogoutController, userSignUpController } from "../../controllers/userController/userAuth/authController";

const userRouers=Router()

userRouers.post('/userSignUp',userSignUpController)
userRouers.post('/userLogin',userLoginController)
userRouers.get('/userLogout',userLogoutController)
userRouers.post('/userGoogleAuth',userGoogleAuth)



export default userRouers