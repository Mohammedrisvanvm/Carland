import { Router } from "express";
import { banVendor } from "../../controllers/adminController/vendorManagement";
import { banHub, getAllHubs } from "../../controllers/adminController/hubManagement";

const adminHub=Router()

adminHub.get('/allhubs',getAllHubs)
adminHub.post('/banhub',banHub)

export default adminHub