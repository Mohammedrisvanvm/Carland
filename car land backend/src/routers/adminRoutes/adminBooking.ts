import { Router } from "express";
import { banVendor, getAllVendors } from "../../controllers/adminController/vendorManagement";
import { allBookings } from "../../controllers/adminController/bookingManagement";

const adminBooking=Router()

adminBooking.get('/allBookings',allBookings)


export default adminBooking