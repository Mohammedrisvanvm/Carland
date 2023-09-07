// rootReducer.js
import { combineReducers } from "redux";
import userReducer from '../Slices/UserSlice/UserSlice'
import vendorReducer from '../Slices/UserSlice/VendorSlice'
import adminReducer from "../Slices/adminSlice";

const rootReducer = combineReducers({
    user:userReducer,
    admin: adminReducer, 
    vendor: vendorReducer, 
});

export default rootReducer;
