import { Router } from "express";
import userRouters from "./userAuthRouters/UserAuthRouters";
import adminAuth from "./adminRoutes/adminAuth";
import adminUser from "./adminRoutes/adminUser";

let router=Router()


router.use('/auth',adminAuth)
router.use('/usermanagement',adminUser)






export default router