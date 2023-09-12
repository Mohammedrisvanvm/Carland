import { Router } from "express";
import { banVendor, getAllVendors } from "../../controllers/adminController/vendorManagement";

const adminvendor=Router()

adminvendor.get('/allvendors',getAllVendors)
adminvendor.get('/banvendor',banVendor)

export default adminvendor