import { Router } from "express";
import { addVehicleController } from "../../controllers/venderController/vehicleController/vehicleController";

const vendorVehicleRouters=Router()


vendorVehicleRouters.post('/addvehicle',addVehicleController)




export default vendorVehicleRouters