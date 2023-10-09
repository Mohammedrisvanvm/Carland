import { Router } from "express";
import adminAuth from "./adminRoutes/adminAuth";
import adminUser from "./adminRoutes/adminUser";
import adminvendor from "./adminRoutes/adminVendor";
import adminHub from "./adminRoutes/adminHub";
import adminCar from "./adminRoutes/adminCar";
import adminBooking from "./adminRoutes/adminBooking";

let router=Router()


router.use('/auth',adminAuth)
router.use('/usermanagement',adminUser)
router.use('/vendormanagement',adminvendor)
router.use('/hubmanagement',adminHub)
router.use('/carmanagement',adminCar)
router.use('/bookingmanagement',adminBooking)






export default router