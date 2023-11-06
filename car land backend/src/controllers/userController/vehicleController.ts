import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import { calculateDistance } from "../../helpers/calculateDistance";
import mongoose from "mongoose";
export const userVehicles = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pageNumber: number = Number(req.query.currentPage);
    type search = {
      search?: string;
      filter?: string;
      lat?: number;
      lng?: number;
      seletedDate?: string;
    };
    console.log(req.query);

    const { search, filter, lat, lng, seletedDate }: search = req.query;
    console.log(search, "1", filter, "2", lat, "3", lng, "4", seletedDate);

    const query: { isVerified: boolean; vehicleName?: RegExp; fuel?: string } =
      { isVerified: true };

    if (search) {
      query.vehicleName = new RegExp(search, "i");
    }
    if (filter) {
      query.fuel = filter;
    }

    const hubDetails: Ihub[] = await hubModel.find();

    const filteredHubDetails = hubDetails.filter((item: Ihub): boolean => {
      const value: number = calculateDistance(
        item.location.latitude,
        item.location.longitude,
        lat,
        lng
      );

      return value <= 50;
    });

    if (filteredHubDetails.length == 0 && lat) {
      return res.json({ vehicles: "" });
    }
    const filteredVehicles: string[][] = filteredHubDetails.map(
      (item: Ihub): string[] => {
        return item.vehicles;
      }
    );
    const nonEmptyVehicles: string[][] = filteredVehicles.filter(
      (arr) => arr.length > 0
    );

    const perPage = 4;
    const skip = (pageNumber - 1) * perPage;

    const filter1: any = {
      isVerified: true,
    };
    if (filter) {
      filter1.fuel = filter;
    }
    if (search) {
      filter1.vehicleName = {
        $regex: new RegExp(search, "i"),
      };
    }
    if (nonEmptyVehicles.length > 0) {
      filter1["_id"] = {
        $in: nonEmptyVehicles
          .flat()
          .map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    const vehicles: IVehicle[] = await vehicleModel.aggregate([
      { $match: filter1 },
      {
        $skip: skip,
      },
      {
        $limit: perPage,
      },
    ]);

    const count: number = await vehicleModel.countDocuments(query);
    const query1: any = {};

    if (seletedDate) {
      // Initialize the bookingDates object
      query1.bookingDates = {};

      // Set the pickUp and dropOff properties to check for inequality
      query1.bookingDates.pickUp = {
        $gte: new Date(seletedDate[0]),
        $lte: new Date(seletedDate[1]),
      };
      query1.bookingDates.dropOff = {
        $gte: new Date(seletedDate[0]),
        $lte: new Date(seletedDate[1]),
      };
    }

    const vehicles1: IVehicle[] = await vehicleModel.aggregate([
      { $match: query1 },
    ]);
    if (seletedDate) {
      console.log(seletedDate.split(",")[0]);

      console.log(new Date(seletedDate.split(",")[0]));
      console.log(new Date(seletedDate.split(",")[1]));

      const vehicles2: IVehicle[] = await vehicleModel.find({
      
      });
      console.log(vehicles2);
      vehicles2.map((item)=>{
// item.pickup
      })
    }

    res.json({ vehicles, count });
  }
);
export const singleCar = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id: string = typeof req.query.id === "string" ? req.query.id : "";
    const vehicle: IVehicle = await vehicleModel.findById(id);
    const hub: Ihub = await hubModel.findOne({ vehicles: { $in: [id] } });

    const datesArray: Date[] = [];

    for (let i = 0; i < vehicle.bookingDates.pickUp.length; i++) {
      const currentDate = new Date(vehicle.bookingDates.pickUp[i]);
      const dropOffDate = vehicle.bookingDates.dropOff[i];

      while (currentDate <= dropOffDate) {
        datesArray.push(new Date(currentDate));
        currentDate.setHours(0, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    res.status(200).json({
      vehicle,
      location: { placeName: hub.placeName, coords: hub.location },
      datesArray,
    });
  }
);
