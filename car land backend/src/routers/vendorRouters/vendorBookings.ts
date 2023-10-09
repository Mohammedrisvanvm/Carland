import { Router } from "express";
import { getBookings, pickUpreqAction } from "../../controllers/venderController/vendorBookingcontroller";

const vendorBookings = Router();

vendorBookings.get("/getBookings", getBookings);
vendorBookings.get("/pickUpreqAction", pickUpreqAction);

export default vendorBookings;