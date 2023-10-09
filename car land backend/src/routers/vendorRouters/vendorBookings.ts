import { Router } from "express";
import { getBookings } from "../../controllers/venderController/vendorBookingcontroller";

const vendorBookings = Router();

vendorBookings.get("/getBookings", getBookings);

export default vendorBookings;