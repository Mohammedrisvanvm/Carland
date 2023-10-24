import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import cloudinary from "../../config/cloudinary";
import { verifyJwt } from "../../utils/jwtUtils/jwtutils";

import IVendor from "../../interfaces/vendorInterface";
import VendorModel from "../../models/vendorSchema";
import bookModel from "../../models/bookingSchema";
import IBookWithTimestamps from "src/interfaces/bookingInterface";

export const addhub = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      hubName,
      pincode,
      validityDate,
      license,
      hubImage,
      hubMultiImage,
      placeName,
      location,
    }: Ihub = req.body.values;
    console.log(req.body);

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
        location,
        placeName,
        pincode,
        validityDate,
        license: images[1].url,
        hubImage: images[0].url,
        hubMultiImage: multi,
      });

      await VendorModel.findOneAndUpdate(
        { phoneNumber: req.headers.authorization },
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
    console.log(typeof req.headers.authorization, "number");

    const dbout: IVendor = await VendorModel.findOne(
      { phoneNumber: req.headers.authorization },
      { renthubs: 1, _id: 0 }
    );
    console.log(dbout);
    const hubs: Ihub[] = await hubModel.find({ _id: { $in: dbout.renthubs } });

    res.json({ hubs });
  }
);

export const dashboardDetails = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.query.hubId as string;
    const data: IBookWithTimestamps[] = await bookModel.aggregate([
      { $match: { hubId: id } },
      {
        $group: {
          _id: null,
          totalAmountCompleted: {
            $sum: {
              $cond: [{ $eq: ["$status", "Completed"] }, "$totalPrice", 0],
            },
          },
          totalOrders: { $sum: 1 },
          totalUsers: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({dashboardDetails:data})
    console.log(data);
  }
);
