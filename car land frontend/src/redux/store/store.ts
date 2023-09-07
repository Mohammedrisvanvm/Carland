import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "../Slices/adminSlice";
import UserSlice from "../Slices/UserSlice/UserSlice";
import VendorSlice from "../Slices/UserSlice/VendorSlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const persistConfig={
  key :'root',
  storage,
  whitelist: ['userReducer'],
  expires: 7 * 24 * 60 * 60
}

const persistedReducer =persistReducer(persistConfig)

 const Store=configureStore({
    reducer:{
      user:UserSlice ,
      vender:VendorSlice,
      admin:adminSlice
    }
}) 
export default Store
export type Rootstate =ReturnType<typeof Store.getState>

export type AppDispatch=typeof Store.dispatch