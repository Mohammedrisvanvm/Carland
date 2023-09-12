import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import cloudinary from "../../config/cloudinary";
export const addhub = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);
    const {
      hubName,
      location,
      pincode,
      validityDate,
      license,
      hubImage,
      hubMultiImage,
    }: Ihub = req.body.values;
    console.log(
      hubName,
      location,
      pincode,
      validityDate,
      license,
      hubImage,
      hubMultiImage
    );
    const hub: Ihub | null = await hubModel.findOne({ hubName });
    if (!hub) {
      const singleImage = await cloudinary.uploader
        .upload(hubImage, { folder: "hub" })
        .then((response) => response.url);
      const Document = await cloudinary.uploader
        .upload(license, { folder: "hubdoc" })
        .then((response) => response.url);
      const SubImages = await Promise.all(
        hubMultiImage.map(async (image, index) => {
          try {
            const response = await cloudinary.uploader.upload(image, {
              folder: "hub",
            });

            return response.url;
          } catch (error) {
            console.error("Error uploading image:", error);
            return "";
          }
        })
      );

      const hub: Ihub = await hubModel.create({
        hubName,
        location,
        pincode,
        validityDate,
        license: Document,
        hubImage: singleImage,
        hubMultiImage: SubImages,
      });
      res.status(201).json({ message: `${hub.hubName}vehicle added` });
    } else {
      throw new Error("vehicle already exist");
    }
  }
);
