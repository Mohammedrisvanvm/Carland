import { Router } from "express";
import { ProfileVerification, banUser, getAllUser } from "../../controllers/adminController/userManagement";
let adminUser = Router();






adminUser.get("/allusers", getAllUser);
adminUser.post("/banuser", banUser);
adminUser.post("/verifyprofile", ProfileVerification);


export default adminUser