import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";

export const getAllHubs = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
 
    console.log(req.query);
    
    type search={
      search?:string
    }
    const {search}:search=req.query
    const hubs: Ihub[] = await hubModel.find({
      hubName: new RegExp(search, "i"),
    });
    res.json({ hubs });
  }
);
export const banHub = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const hub: Ihub | null = await hubModel.findById(id);

    if (hub) {
      hub.ban = !hub.ban;
      await hub.save();
    }

    res.status(200).json({ message: "success" });
  }
);
export const verifyHub = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.body.value;

    const hub: Ihub | null = await hubModel.findById(id);

    if (hub) {
      hub.isVerified = !hub.isVerified;
      await hub.save();
    }

    res.status(200).json({ message: "success" });
  }
);
export const hubSearch = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {

    console.log(req.query);
    type search={
      search?:string
    }
    const {search}:search=req.query
    const hubs: Ihub[] = await hubModel.find({
      hubName: new RegExp(search, "i"),
    });
    res.json({ hubs });
  }
);
