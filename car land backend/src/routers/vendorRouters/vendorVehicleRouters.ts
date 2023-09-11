import { Router } from "express";
import { addVehicleController, getVehiclesController } from "../../controllers/venderController/vehicleController";

const vendorVehicleRouters=Router()


vendorVehicleRouters.post('/addvehicle',addVehicleController)
vendorVehicleRouters.get('/getvehicles',getVehiclesController)




export default vendorVehicleRouters