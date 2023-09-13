import { Router } from "express";
import { banVendor, getAllVendors } from "../../controllers/adminController/vendorManagement";
import { getAllHubs } from "src/controllers/adminController/hubManagement";

const adminHub=Router()

adminHub.get('/allhubs',getAllHubs)
adminHub.post('/banhub',banVendor)

export default adminHub