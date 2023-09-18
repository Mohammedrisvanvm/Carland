import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import vehicleModel from "../../models/vehicleSchema";
import IVehicle from "../../interfaces/vehicleInterface";
import cloudinary from "../../config/cloudinary";
interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  url: string;
}
export const addVehicleController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      vehicleName,
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
      documents,
    }: IVehicle = req.body.values;
    const hubId: string = req.body.id;

    const singleImage = await cloudinary.uploader
      .upload(vehiclesingleimage, { folder: "cars" })
      .then((response) => response.url);
    const SubImages = await Promise.all(
      vehiclemultipleimage.map(async (image, index) => {
        try {
          const response = await cloudinary.uploader.upload(image, {
            folder: "cars",
          });

          return response.url;
        } catch (error) {
          console.error("Error uploading image:", error);
          return "";
        }
      })
    );

    const vehicle: IVehicle | null = await vehicleModel.findOne({
      vehicleNumber,
    });

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
        documents,
        hubId,
      });
      res.status(201).json({ message: `${vehicle.vehicleName}vehicle added` });
    } else {
      throw new Error("vehicle already exist");
    }
  }
);

export const getVehiclesController = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type hubId = {
      hubId?: string;
      search?: string;
    };
    const { hubId, search }: hubId = req.query;
    console.log(hubId, search, 11);
    if (search == "") {
      var vehicles: IVehicle[] = await vehicleModel.find({ hubId: hubId });
    } else {
      var vehicles: IVehicle[] = await vehicleModel.find({
        vehicleName: new RegExp(search, "i"),
      });
    }
    console.log(vehicles, 11);

    res.status(200).json({ vehicles });
  }
);
