import { Router } from "express";
import { banCar, getAllCars, verifyCar } from "../../controllers/adminController/CarManagement";
const adminCar = Router();






adminCar.get("/allcars", getAllCars);
adminCar.patch("/bancar", banCar);
adminCar.patch("/verifycar", verifyCar);




export default adminCar