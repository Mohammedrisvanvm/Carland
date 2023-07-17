import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice/UserSlice";



export const Store=configureStore({
    reducer:{
      User:UserSlice  
    }
}) 


