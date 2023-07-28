import AsyncHandler from "express-async-handler";
import { Request, Response, } from "express";
import vehicleModel from "../../../models/vehicleSchema";
import IVehicle from "../../../interfaces/vehicleInterface";

export const addVehicleController = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("ahi",req.body);
    
    const { vehicleName,
    vehicleNumber,
    serviceType,
    type,
    colour,
    fuel,
    numofseats,
    hubName,
    mileage,
    fairPrice,
    fairKm,
    vehiclesingleimage,
    vehiclemultipleimage,
    specification,
    vehicleValidityDate,
    documents}: IVehicle = req.body.values
    console.log(vehicleName,
        vehicleNumber,
        serviceType,
        type,
        colour,
        fuel,
        numofseats,
        hubName,
        mileage,
        fairPrice,
        fairKm,
        vehiclesingleimage,
        vehiclemultipleimage,
        specification,
        vehicleValidityDate,
        documents)
    // const vehicle: IVehicle | null = await vehicleModel.findOne({ vehicleNumber })

    // if (!vehicle) {
    //     const vehicle: {} = await vehicleModel.create({
    //         vehicleName,
    //         vehicleNumber,
    //         serviceType,
    //         type,
    //         image,
    //         colour,
    //         fuel,
    //         numofseats,
    //         hubName,
    //         mileage,
    //         fairPrice,
    //         fairKm,
    //         status,
    //         specification,
    //         vehicleValidate,
    //         documents
    //     })
    //     res.status(201).json({ vehicle })
    // } else {
    //     throw new Error('vehicle already exist')
    // }
    res.status(200).json({message:"getted"})
})