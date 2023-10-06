import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import IVehicle from "../../interfaces/vehicleInterface";
import vehicleModel from "../../models/vehicleSchema";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";
import { calculateDistance } from "../../helpers/calculateDistance";
export const userVehicles = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const pageNumber: number = Number(req.query.currentPage);
    type search = {
      search?: string;
      filter?: string;
      lat?: number;
      lng?: number;
      seletedDate?: string[];
    };
   
    const { search, filter, lat, lng, seletedDate }: search = req.query;
    console.log(search, filter, lat, lng, seletedDate);

    const query: any = { isVerified: true };

    if (search) {
      query.vehicleName = new RegExp(search, "i");
    }
    if (filter) {
      query.fuel = new RegExp(filter, "i");
    }
    const hubDetails: Ihub[] = await hubModel.find({});
    const filteredHubDetails = hubDetails.filter((item: Ihub): boolean => {
      const value: number = calculateDistance(
        item.location.lat,
        item.location.lng,
        lat,
        lng
      );
      return value >= 50;
    });

    const vehicles1: string[][] = filteredHubDetails.map(
      (item: Ihub): string[] => {
        return item.vehicles;
      }
    );

    const perPage = 4;
    const skip = (pageNumber - 1) * perPage;

    const vehicles: IVehicle[] = await vehicleModel
      .find(query)
      .skip(skip)
      .limit(perPage);

    console.log(vehicles);
    const count: number = await vehicleModel.countDocuments(query);
    res.json({ vehicles, count });
  }
);
export const singleCar = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id: string = typeof req.query.id === "string" ? req.query.id : "";
    const vehicle: IVehicle = await vehicleModel.findById(id);

    res.json({ vehicle });
  }
);
