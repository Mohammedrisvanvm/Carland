import { Router } from "express";
import { banUser, getAllUser } from "../../controllers/adminController/userManagement";
let adminUser = Router();






adminUser.get("/allusers", getAllUser);
adminUser.post("/banuser", banUser);


export default adminUser