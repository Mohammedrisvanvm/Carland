import { Router } from "express";
import { dropOffAction, getBookings, pickUpreqAction, salesReports } from "../../controllers/venderController/vendorBookingcontroller";

const vendorBookings = Router();

vendorBookings.get("/getBookings", getBookings);
vendorBookings.get("/pickUpreqAction", pickUpreqAction);
vendorBookings.patch('/dropoffreqaction',dropOffAction)
vendorBookings.get('/salesreports',salesReports)

export default vendorBookings;