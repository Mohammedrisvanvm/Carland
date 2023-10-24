import { Router } from "express";
import { allBookings } from "../../controllers/adminController/bookingManagement";

const adminBooking=Router()

adminBooking.get('/allBookings',allBookings)


export default adminBooking