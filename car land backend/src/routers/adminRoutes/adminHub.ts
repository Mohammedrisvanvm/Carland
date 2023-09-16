import { Router } from "express";
import { banHub, getAllHubs, hubSearch, verifyHub } from "../../controllers/adminController/hubManagement";

const adminHub=Router()

adminHub.get('/allhubs',getAllHubs)
adminHub.post('/banhub',banHub)
adminHub.get('/search',hubSearch)
adminHub.patch('/verifyhub',verifyHub)

export default adminHub