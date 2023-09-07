import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "../Slices/UserSlice/UserSlice";
import VendorSlice from "../Slices/UserSlice/VendorSlice";
import adminSlice from "../Slices/adminSlice";

const rootReducer=combineReducers({
    userReducer:UserSlice,
    vendorReducer:VendorSlice,
    adminReducer:adminSlice
})

export default rootReducer;