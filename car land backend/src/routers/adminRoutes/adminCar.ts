import { Router } from "express";
import { banCar, getAllCars } from "../../controllers/adminController/CarManagement";
let adminCar = Router();






adminCar.get("/allcars", getAllCars);
adminCar.patch("/bancar", banCar);


export default adminCar