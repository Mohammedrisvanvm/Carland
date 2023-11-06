import { Router } from "express";
import { singleCar, userVehicles } from "../../controllers/userController/vehicleController";

const userCarRouters=Router()

userCarRouters.get('/getvehicles',userVehicles)
userCarRouters.get('/singlecar',singleCar)



export default userCarRouters