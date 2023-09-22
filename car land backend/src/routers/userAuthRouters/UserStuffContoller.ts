import { Router } from "express";
import { userVehicles } from "../../controllers/userController/vehicleController";
import { verifyNumber, verifyOtp } from "../../controllers/userController/userStuff";

const userStuffController=Router()

userStuffController.post('/verifynumber',verifyNumber)
userStuffController.post('/verifyotp',verifyOtp)


export default userStuffController