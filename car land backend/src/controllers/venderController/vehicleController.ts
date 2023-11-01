import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import vehicleModel from "../../models/vehicleSchema";
import IVehicle from "../../interfaces/vehicleInterface";
import cloudinary from "../../config/cloudinary";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
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
      year,
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
      DocumentVehicle,
    }: IVehicle = req.body.values;
    const hubId: string = req.body.id;


    const docimage = await cloudinary.uploader
      .upload(DocumentVehicle, { folder: "carsDoc" })
      .then((response) => response.url);

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
        colour,
        year,
        fuel,
        numofseats,
        hubName,
        mileage,
        fairPrice,
        fairKm,
        singleImage,
        SubImages,
        specification,
        vehicleValidityDate,
        DocumentVehicle: docimage,
      });

      const hub: Ihub = await hubModel.findByIdAndUpdate(hubId, {
        $addToSet: { vehicles: vehicle._id },
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


    var pipeline = [
      {
        $match: {
          _id: new ObjectId(hubId),
        },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "vehicles",
          foreignField: "_id",
          as: "vehicleData",
        },
      },
      {
        $unwind: "$vehicleData",
      },
      {
        $match: {
          $or: [
            { "vehicleData.vehicleName": { $regex: search, $options: "i" } },
            { "vehicleData.vehicleNumber": { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $replaceRoot: {
          newRoot: "$vehicleData",
        },
      },
    ];
    var vehicles: IVehicle[] = await hubModel.aggregate(pipeline);

    res.status(200).json({ vehicles });
  }
);
