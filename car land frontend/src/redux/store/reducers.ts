
import { combineReducers } from "redux";
import adminReducer from '../Slices/adminSlice'
import vendorReducer from '../Slices/UserSlice'
import userReducer from '../Slices/VendorSlice'


const rootReducer = combineReducers({
   user: userReducer,
   admin:adminReducer, 
   vendor:vendorReducer, 
});
export default rootReducer
