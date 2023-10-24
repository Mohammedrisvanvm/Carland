import { Router } from "express";
import {  adminCheck, adminLogin, adminLogout } from "../../controllers/adminController/adminAuth";


const adminAuth=Router()


adminAuth.post('/',adminLogin)
adminAuth.get('/adminCheck',adminCheck)
adminAuth.get('/logout',adminLogout)







export default adminAuth