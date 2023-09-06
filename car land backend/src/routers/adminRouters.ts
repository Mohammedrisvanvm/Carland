import { Router } from "express";
import { adminAuth } from "../controllers/adminController/adminAuth";


let router=Router()


router.post('/auth',adminAuth)






export default router