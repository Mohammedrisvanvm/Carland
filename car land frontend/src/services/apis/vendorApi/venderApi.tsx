import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const CarAdd = async(values: IAddcar): Promise<AxiosResponse<any>> => {
    
    
    return axiosBase.post("/vendors/vehicle/addvehicle", {values} )
  };
  export const getVehicle = async(): Promise<AxiosResponse<any>> => {
    return axiosBase.get("/vendors/vehicle/getvehicles")
  };
  export const VendorAuthSignUp=async(values:{}):Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/vendors/auth/vendorsignup",{values})
  }
  export const VendorAuthLogin=async(values:{}):Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/vendors/auth/vendorsignup",{values})
  }
  export const VendorOtpVerify=async(value:number):Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/vendors/auth/vendorotpverify",{value})
  }