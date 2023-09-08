
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}):Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin=(value:{}):Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/users/auth/userLogin",{value})
}
export const userOtpVerify=(value:number):Promise<AxiosResponse<any>>=>{
  return axiosBase.post("/users/auth/userOtpcheck",{value})
}

export const userGoogleAuth=(value:{}):Promise<AxiosResponse<any>>=>{
return axiosBase.post("/users/auth/userGoogleAuth",{value})
}

export const userCheck=():Promise<AxiosResponse<any>>=>{
return axiosBase.get("/users/auth/userCheck")
}
export const userSignOut=():Promise<AxiosResponse>=>{
return axiosBase.get("/users/auth/userLogout")
}
export const userGetVehicle = async(): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/vendors/vehicle/getvehicles")
};