import AsyncHandler from "express-async-handler";
import { Request, Response, response, } from "express";
import vehicleModel from "../../../models/vehicleSchema";
import IVehicle from "../../../interfaces/vehicleInterface";
import cloudinary from "../../../config/cloudinary";
interface CloudinaryResponse {
    public_id: string;
    secure_url: string;
    url: string
}
export const addVehicleController = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("ahi", req.body);

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
        documents }: IVehicle = req.body.values

    const singleImage = await cloudinary.uploader.upload(vehiclesingleimage, { folder: "cars" }).then((response => response.url))
    const SubImages = await Promise.all(
        vehiclemultipleimage.map(async (image, index) => {
          try {
            const response = await cloudinary.uploader.upload(image, { folder: "cars" });
            return response.url;
          } catch (error) {
            // Handle error here, e.g., log the error
            console.error('Error uploading image:', error);
            return ''; // Return an empty string or a default URL in case of an error
          }
        })
      );

    console.log(SubImages)
    console.log(singleImage);

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
    res.status(200).json({ message: "getted" })
})