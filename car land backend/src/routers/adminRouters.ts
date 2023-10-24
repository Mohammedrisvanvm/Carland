import { Router } from "express";
import adminAuth from "./adminRoutes/adminAuth";
import adminUser from "./adminRoutes/adminUser";
import adminvendor from "./adminRoutes/adminVendor";
import adminHub from "./adminRoutes/adminHub";
import adminCar from "./adminRoutes/adminCar";
import adminBooking from "./adminRoutes/adminBooking";
import adminDashboard from "./adminRoutes/adminDashboard";

const router=Router()


router.use('/auth',adminAuth)
router.use('/usermanagement',adminUser)
router.use('/vendormanagement',adminvendor)
router.use('/hubmanagement',adminHub)
router.use('/carmanagement',adminCar)
router.use('/bookingmanagement',adminBooking)
router.use('/dashboard',adminDashboard)






export default router