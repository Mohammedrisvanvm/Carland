import { Router } from "express";
import adminAuth from "./adminRoutes/adminAuth";
import adminUser from "./adminRoutes/adminUser";
import adminvendor from "./adminRoutes/adminVendor";
import adminHub from "./adminRoutes/adminHub";

let router=Router()


router.use('/auth',adminAuth)
router.use('/usermanagement',adminUser)
router.use('/vendormanagement',adminvendor)
router.use('/hubmanagement',adminHub)






export default router