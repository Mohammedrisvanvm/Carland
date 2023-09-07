import { Router } from "express";
import { adminAuth, adminCheck } from "../controllers/adminController/adminAuth";


let router=Router()


router.post('/auth',adminAuth)
router.get('/adminCheck',adminCheck)






export default router