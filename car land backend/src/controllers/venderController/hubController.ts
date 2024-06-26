import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import cloudinary from "../../config/cloudinary";
import { verifyJwt } from "../../utils/jwtUtils/jwtutils";

import IVendor from "../../interfaces/vendorInterface";
import VendorModel from "../../models/vendorSchema";
import bookModel from "../../models/bookingSchema";
import IBookWithTimestamps from "../../interfaces/bookingInterface";
import {
  CloudinaryUploader,
  CloudinaryRemover,
} from "../../interfaces/cloudinaryInterface";

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

    const dbout: IVendor = await VendorModel.findOne(
      { phoneNumber: req.headers.authorization },
      { renthubs: 1, _id: 0 }
    );

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
          totalUsers: { $addToSet: "$userId" },

          totalPickup: {
            $sum: { $cond: [{ $eq: ["$status", "PickUp"] }, 1, 0] },
          },
          totalPickUpreq: {
            $sum: { $cond: [{ $eq: ["$status", "pickUpreq"] }, 1, 0] },
          },
          totalOngoing: {
            $sum: { $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0] },
          },
          totalDropOffReq: {
            $sum: { $cond: [{ $eq: ["$status", "dropOffReq"] }, 1, 0] },
          },
          totalCompleted: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
          totalCancelled: {
            $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmountCompleted: 1,
          totalOrders: 1,
          totalUsers: { $size: "$totalUsers" },
          totalCancelled: 1,
          totalOngoing: 1,
          totalPickup: 1,
          totalDropOffReq: 1,
          totalPickUpreq: 1,
          totalCompleted: 1,
        },
      },
    ]);

    const resultArray: number[] = [];

    if (data.length > 0) {
      const firstResult: any = data[0];

      for (const key in firstResult) {
        if (
          typeof firstResult[key] === "number" &&
          key != "totalAmountCompleted" &&
          key != "totalOrders" &&
          key != "totalUsers"
        ) {
          resultArray.push(firstResult[key]);
        }
      }
    }
    res.status(200).json({
      message: "dashboard Details Vendor",
      dashboardDetails: { data, resultArray },
    });
  }
);

export const profileData = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const hubId = req.query.hubId as string;
    const hub: Ihub = await hubModel.findById(hubId);

    res.status(200).json({ hub });
  }
);
export const profileDataUpdate = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    type body = {
      license: string;
      imageMain: string;
      imageSub: string;
      validityDate: string;
      hubId: string;
    };
    const { license, imageMain, imageSub, validityDate, hubId }: body =
      req.body;
    const hub: Ihub | null = await hubModel.findById(hubId);

    const imagesUploadPromises = [];
    const imagesRemovePromises = [];
    if (imageMain) {
      imagesUploadPromises.push(
        cloudinary.uploader.upload(imageMain, {
          folder: "hub",
          public_id: `${hub.hubName + "imageMain"}`,
        })
      );
      imagesRemovePromises.push(
        cloudinary.api.delete_resources([`hub/${hub.hubName + "imageMain"}`], {
          type: "upload",
          resource_type: "image",
        })
      );
    }
    if (imageSub) {
      imagesUploadPromises.push(
        cloudinary.uploader.upload(imageSub, {
          folder: "hub",
          public_id: `${hub.hubName + "imageSub"}`,
        })
      );
      imagesRemovePromises.push(
        cloudinary.api.delete_resources([`hub/${hub.hubName + "imageSub"}`], {
          type: "upload",
          resource_type: "image",
        })
      );
    }
    if (license) {
      imagesUploadPromises.push(
        cloudinary.uploader.upload(license, {
          folder: "hubdoc",
          public_id: `${hub.hubName + "license"}`,
        })
      );
      imagesRemovePromises.push(
        cloudinary.api.delete_resources([`hubdoc/${hub.hubName + "license"}`], {
          type: "upload",
          resource_type: "image",
        })
      );
    }
    const remove: CloudinaryRemover[] = await Promise.all(imagesRemovePromises);
    const images: CloudinaryUploader[] = await Promise.all(
      imagesUploadPromises
    );
   

    images.map((item) => {
     
      if (item.public_id === `hubdoc/${hub.hubName + "license"}`) {
        hub.license = item.url;
      }
      if (item.public_id === `hub/${hub.hubName + "imageSub"}`) {
        hub.hubMultiImage = [item.url];
      }
      if (item.public_id === `hub/${hub.hubName + "imageMain"}`) {
        hub.hubImage = item.url;
      }
    });
    if (validityDate) {
      hub.validityDate = new Date(validityDate);
    }

    await hub.save();

    res.status(200).json({ message: "updated" });
  }
);
