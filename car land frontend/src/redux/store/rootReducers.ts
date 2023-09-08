import { combineReducers } from "redux";
import userSlice from "../slice/userSlice";
import adminSlice from "../slice/adminSlice";
import vendorSlice from "../slice/vendorSlice";

const rootReducer=combineReducers({
    user:userSlice,
    admin:adminSlice,
    vendor:vendorSlice
})

export default rootReducer