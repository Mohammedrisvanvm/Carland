import { Router } from "express";
import { banVendor, getAllVendors } from "../../controllers/adminController/vendorManagement";

const adminvendor=Router()

adminvendor.get('/allvendors',getAllVendors)
adminvendor.post('/banvendor',banVendor)

export default adminvendor