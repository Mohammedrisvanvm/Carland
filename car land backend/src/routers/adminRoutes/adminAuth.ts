import { Router } from "express";
import {  adminCheck, adminLogin } from "../../controllers/adminController/adminAuth";


let adminAuth=Router()


adminAuth.post('/',adminLogin)
adminAuth.get('/adminCheck',adminCheck)







export default adminAuth