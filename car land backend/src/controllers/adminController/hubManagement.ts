import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import Ihub from "../../interfaces/hubInterface";
import hubModel from "../../models/hubSchema";


export const getAllHubs = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {



        const hubs:Ihub[]=await hubModel.find()
        res.json({hubs})
    })
    export const banHub = AsyncHandler(
        async (req: Request, res: Response): Promise<void> => {
          const id: string = req.body.value;
      
          const hub: Ihub | null = await hubModel.findById(id);
      console.log(hub);
      
          if (hub) {
            hub.ban = !hub.ban;
            await hub.save();
          }
      
          res.status(200).json({ message: "success" });
        }
      );
      