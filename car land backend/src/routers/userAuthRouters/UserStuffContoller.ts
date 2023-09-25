import { Router } from "express";
import { ProfileVerificationData, userprofileData, verifyNumber, verifyOtp } from "../../controllers/userController/userStuff";
import { parseImages } from "../../utils/multer/multer";


const userStuffController=Router()

userStuffController.post('/verifynumber',verifyNumber)
userStuffController.post('/verifyotp',verifyOtp)
userStuffController.patch('/userprofileData',userprofileData)
userStuffController.put('/ProfileVerificationData',parseImages,ProfileVerificationData)


export default userStuffController