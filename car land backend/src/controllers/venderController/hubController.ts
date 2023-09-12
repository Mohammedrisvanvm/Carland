
import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import cloudinary from "../../config/cloudinary";

export const addhub = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      hubName,
      place,
      pincode,
      validityDate,
      license,
      hubImage,
      hubMultiImage,
    }: Ihub = req.body.values;

    const hub: Ihub | null = await hubModel.findOne({ hubName });

    if (!hub) {
      const images = await Promise.all([
        cloudinary.uploader.upload(hubImage, { folder: "hub" }),
        cloudinary.uploader.upload(license, { folder: "hubdoc" }),
      ]);

      const multi = await Promise.all(
        hubMultiImage.map(async (image) => {
          const response = await cloudinary.uploader.upload(image, {
            folder: "hub",
          });
          return response.url;
        })
      );

      const hub = await hubModel.create({
        hubName,
        location: place,
        pincode,
        validityDate,
        license: images[1].url,
        hubImage: images[0].url,
        hubMultiImage: multi,
      });

      res.json({ message: `created new hub ${hub.hubName}` });
    } else {
      throw new Error("hub already exist");
    }
  }
);



export const getHubs = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {

        const hubs:Ihub[]= await hubModel.find()
      
        res.json({hubs})
    })