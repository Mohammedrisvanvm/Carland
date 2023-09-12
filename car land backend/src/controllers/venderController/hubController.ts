import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "src/interfaces/hubInterface";
import hubModel from "src/models/hubSchema";
import cloudinary from "src/config/cloudinary";
export const addhub = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const {  hubName,
        location,
        pincode,
        validityDate,
        license,
        hubImage,
        hubMultiImage}:Ihub=req.body.values
    console.log(hubName,
        location,
        pincode,
        validityDate,
        license,
        hubImage,
        hubMultiImage);
    const singleImage = await cloudinary.uploader.upload(hubImage, { folder: "hub" }).then((response => response.url))
    const Document = await cloudinary.uploader.upload(license, { folder: "hubdoc" }).then((response => response.url))
    const SubImages = await Promise.all(
        hubMultiImage.map(async (image, index) => {
        try {
          const response = await cloudinary.uploader.upload(image, { folder: "hub" });
        
          
          return response.url;
        } catch (error) {
  
          console.error('Error uploading image:', error);
          return '';
        }
      })
    );
    
   
})


export const addVehicleController = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  

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
  
          console.error('Error uploading image:', error);
          return '';
        }
      })
    );
  
  
  
    const vehicle: IVehicle | null = await vehicleModel.findOne({ vehicleNumber })
  
    if (!vehicle) {
      const vehicle: IVehicle = await vehicleModel.create({
        vehicleName,
        vehicleNumber,
        serviceType,
        colour,
        fuel,
        type,
        numofseats,
        hubName,
        mileage,
        fairPrice,
        fairKm,
        singleImage,
        SubImages,
        specification,
        vehicleValidityDate,
        documents
      })
      res.status(201).json({ message:`${vehicle.vehicleName}vehicle added` })
    } else {
      throw new Error('vehicle already exist')
    }
  
  })