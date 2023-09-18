import { Router } from "express";
import { userVehicles } from "../../controllers/userController/vehicleController";

const userCarRouters=Router()

userCarRouters.get('/getvehicles',userVehicles)


export default userCarRouters