import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../Slices/adminSlice";
import UserSlice from "../Slices/UserSlice/UserSlice";
import VenderSlice from "../Slices/UserSlice/VenderSlice";




 const Store=configureStore({
    reducer:{
      user:UserSlice ,
      vender:VenderSlice,
      admin:adminSlice
    }
}) 
export default Store
export type Rootstate =ReturnType<typeof Store.getState>

export type AppDispatch=typeof Store.dispatch