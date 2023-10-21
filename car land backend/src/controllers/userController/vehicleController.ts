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

    const { search, filter, lat, lng, seletedDate }: search = req.query;
    console.log(search,"1", filter,"2", lat,"3", lng,"4", seletedDate);

    const query: { isVerified: boolean; vehicleName?: RegExp; fuel?: string } =
      { isVerified: true };

    if (search) {
      query.vehicleName = new RegExp(search, "i");
    }
    if (filter) {
      query.fuel = filter;
    }

    // if(seletedDate){
    //   query.bookingDates.pickUp={$ne:seletedDate[0]}
    //   query.bookingDates.dropOff={$ne:seletedDate[1]}

    // }
    const hubDetails: Ihub[] = await hubModel.find();

    const filteredHubDetails = hubDetails.filter((item: Ihub): boolean => {
      const value: number = calculateDistance(
        item.location.lat,
        item.location.lng,
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

    // const vehicles: IVehicle[] =
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
    // if (seletedDate) {
    //   const [pickUpDate, dropOffDate]: string[] = seletedDate.split(',');

    //   filter1.bookingDates= {
    //     $nin: [
    //       {
    //         $elemMatch: { pickUp: { $in: pickUpDate } },
    //       },
    //       {
    //         $elemMatch: { dropOff: { $in: dropOffDate } },
    //       },
    //     ],
    //   };
    // }

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
    // const [pickUpDate, dropOffDate]: string[] = seletedDate.split(",");
    // const pickeddates: any = await vehicleModel.find({
    //   bookingDates: {
    //     $not: {
    //       $elemMatch: { pickUp: pickUpDate, dropOff: dropOffDate }
    //     }
    //   }
    // });

    // console.log(pickeddates);

    res.json({ vehicles, count });
  }
);
export const singleCar = AsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id: string = typeof req.query.id === "string" ? req.query.id : "";
    const vehicle: IVehicle = await vehicleModel.findById(id);
    const hub: Ihub = await hubModel.findOne({ vehicles: { $in: [id] } });
    console.log(vehicle.bookingDates);
    let datesArray: Date[] = [];
    // vehicle.bookingDates.pickUp.forEach((pickUpDate, index) => {
    //   vehicle.bookingDates.dropOff.forEach((dropOffDate, index) => {
    //     let currentDate = new Date(pickUpDate);

    //     while (currentDate <= dropOffDate) {
    //       datesArray.push(new Date(currentDate));

    //       currentDate.setDate(currentDate.getDate() + 1);
    //     }
    //   });
    // });
    for (let i = 0; i < vehicle.bookingDates.pickUp.length; i++) {
      let currentDate = new Date(vehicle.bookingDates.pickUp[i]);
      const dropOffDate = vehicle.bookingDates.dropOff[i];
    
      while (currentDate <= dropOffDate) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    console.log(datesArray);

    res.json({ vehicle, location: hub.location,datesArray });
  }
);
