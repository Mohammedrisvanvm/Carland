import { Router } from "express";
import { dropOffAction, getBookings, pickUpreqAction } from "../../controllers/venderController/vendorBookingcontroller";

const vendorBookings = Router();

vendorBookings.get("/getBookings", getBookings);
vendorBookings.get("/pickUpreqAction", pickUpreqAction);
vendorBookings.patch('/dropoffreqaction',dropOffAction)

export default vendorBookings;