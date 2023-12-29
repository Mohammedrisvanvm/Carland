"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userStuff_1 = require("../../controllers/userController/userStuff");
const multer_1 = require("../../utils/multer/multer");
const userStuffController = (0, express_1.Router)();
userStuffController.post('/verifynumber', userStuff_1.verifyNumber);
userStuffController.post('/verifyotp', userStuff_1.verifyOtp);
userStuffController.patch('/userprofileData', userStuff_1.userprofileData);
userStuffController.put('/ProfileVerificationData', multer_1.parseImages, userStuff_1.ProfileVerificationData);
userStuffController.get('/currrentuser', userStuff_1.currrentUser);
exports.default = userStuffController;
//# sourceMappingURL=UserStuffContoller.js.map