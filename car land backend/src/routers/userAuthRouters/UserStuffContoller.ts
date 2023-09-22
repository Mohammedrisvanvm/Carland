import { Router } from "express";
import { userprofileData, verifyNumber, verifyOtp } from "../../controllers/userController/userStuff";

const userStuffController=Router()

userStuffController.post('/verifynumber',verifyNumber)
userStuffController.post('/verifyotp',verifyOtp)
userStuffController.patch('/userprofileData',userprofileData)


export default userStuffController