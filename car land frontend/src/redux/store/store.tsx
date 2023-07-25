import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice/UserSlice";
import VenderSlice from "../Slices/UserSlice/VenderSlice";



export const Store=configureStore({
    reducer:{
      user:UserSlice ,
      vender:VenderSlice
    }
}) 


