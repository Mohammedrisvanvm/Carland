import { Router } from "express";
import { getAllVendors } from "../../controllers/adminController/vendorManagement";

const adminvendor=Router()

adminvendor.get('/allvendors',getAllVendors)

export default adminvendor