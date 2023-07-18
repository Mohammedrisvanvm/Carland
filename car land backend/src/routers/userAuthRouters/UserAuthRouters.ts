import { Router } from "express";
import { userLoginController, userSignUpController } from "../../controllers/userController/userAuth/authController";

const userRouers=Router()

export const userSignUp=userRouers.post('/userSignUp',userSignUpController)
export const userLogin=userRouers.post('/userLogin',userLoginController)



export default userRouers