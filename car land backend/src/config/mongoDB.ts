import mongoose from "mongoose";
import { config } from "./config";


export const  DBconnect=():void=>{
  
    
   mongoose.connect(config.mongo.url,{retryWrites:true,w:'majority'}).then((
   )=>console.log("db connected")).catch((error)=>{
    console.log(error);
    
   })

}
   