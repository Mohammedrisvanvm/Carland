import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import cloudinary from "../../config/cloudinary";
import { verifyJwt } from "../../utils/jwtUtils/jwtutils";

import IVendor from "../../interfaces/vendorInterface";
import VendorModel from "../../models/vendorSchema";

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

      const hub: Ihub = await hubModel.create({
        hubName,
        location: place,
        pincode,
        validityDate,
        license: images[1].url,
        hubImage: images[0].url,
        hubMultiImage: multi,
      });
      const accessTokenvendor: string = req.cookies.accessTokenvendor;
      interface Ipayload {
        payload?: {
          id: string;
          name: string;
          email: string;
          number: string;
        };
        expired?: boolean;
      }
      const value: Ipayload = verifyJwt(accessTokenvendor);
      if (!value) {
        throw new Error("accessToken problem");
      }
      await VendorModel.findByIdAndUpdate(
        { _id: value.payload.id },
        { $addToSet: { renthubs: hub._id } }
      );
      res.json({ message: `created new hub ${hub.hubName}` });
    } else {
      throw new Error("hub already exist");
    }
  }
);

export const getHubs = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const accessTokenvendor: string = req.cookies.accessTokenvendor;
    interface Ipayload {
      payload?: {
        id: string;
        name: string;
        email: string;
        number: string;
      };
      expired?: boolean;
    }
    if (!accessTokenvendor) {
      throw new Error("accessToken not available");
    }
    const jwtdata: Ipayload = verifyJwt(accessTokenvendor);
console.log(typeof(req.headers.authorization),'number');

    const dbout: IVendor = await VendorModel.findOne(
      { phoneNumber: req.headers.authorization },
      { renthubs: 1, _id: 0 }
    );
console.log(dbout);
    const hubs: Ihub[] = await hubModel.find({ _id: { $in: dbout.renthubs } });

    res.json({ hubs });
  }
);

