import { Router } from "express";
import { userLoginController, userLogoutController, userSignUpController } from "../../controllers/userController/userAuth/authController";

const userRouers=Router()

userRouers.post('/userSignUp',userSignUpController)
userRouers.post('/userLogin',userLoginController)
userRouers.get('/userLogout',userLogoutController)



export default userRouers