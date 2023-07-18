import { Router } from "express";
import { userSignUpController } from "../../controllers/userController/userAuth/userSignUpController";

let userRouers=Router()

export const userSignUp=userRouers.post('/userSignUp',userSignUpController)



