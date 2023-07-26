import AsyncHandler from "express-async-handler";
import { Request, Response, } from "express";
import vehicleModel from "../../../models/vehicleSchema";
import IVehicle from "../../../interfaces/vehicleInterface";

export const addVehicleController = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { vehicleName,
        vehicleNumber,
        serviceType,
        type,
        image,
        colour,
        fuel,
        numofseats,
        hubName,
        mileage,
        fairPrice,
        fairKm,
        status,
        specification,
        vehicleValidate,
        documents }:IVehicle = req.body
    console.log(vehicleName,
        vehicleNumber,
        serviceType,
        type,
        image,
        colour,
        fuel,
        numofseats,
        hubName,
        mileage,
        fairPrice,
        fairKm,
        status,
        specification,
        vehicleValidate,
        documents)
    const vehicle: IVehicle | null = await vehicleModel.findOne({ vehicleNumber })

    if (!vehicle) {
        const vehicle: {} = await vehicleModel.create({
            vehicleName,
            vehicleNumber,
            serviceType,
            type,
            image,
            colour,
            fuel,
            numofseats,
            hubName,
            mileage,
            fairPrice,
            fairKm,
            status,
            specification,
            vehicleValidate,
            documents
        })
        res.status(201).json({ vehicle })
    } else {
        throw new Error('vehicle already exist')
    }

})