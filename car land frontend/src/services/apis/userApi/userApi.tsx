import { promises } from "dns";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userLogin", { value });
};
export const userOtpVerify = (value: number): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userotpcheck", { value });
};

export const userGoogleAuth = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userGoogleAuth", { value });
};

export const userCheck = (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/users/auth/userCheck");
};

export const currrentUserFetch = (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/users/stuff/currrentuser");
};
export const userSignOut = (): Promise<AxiosResponse> => {
  return axiosBase.get("/users/auth/userLogout");
};
export const userGetVehicle = async (currentPage:number,search:string,filter:string): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/users/vehicle/getvehicles?currentPage=${currentPage}&search=${search}&filter=${filter}`);
};
export const userSingleGetVehicle = async (id:String|null): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/users/vehicle/singleCar?id=${id}`);
};
export const userVerifyNumber = async (
  phoneNumber: number
): Promise<AxiosResponse> => {
  return await axiosBase.post("/users/stuff/verifynumber", { phoneNumber });
};
export const userVerifyNumberOtp = async (
  otp: number
): Promise<AxiosResponse> => {
  return await axiosBase.post("/users/stuff/verifyotp", { otp });
};
export const userprofileData = async (
  gender: string,
  userName: string | null | undefined
): Promise<AxiosResponse> => {
  return await axiosBase.patch("/users/stuff/userprofileData", {
    gender,
    userName,
  });
};

export const ProfileVerificationData = async (
  formData:FormData
): Promise<AxiosResponse> => {
  return await axiosBase.put("/users/stuff/ProfileVerificationData",formData,{headers:{
    
  }}
 );
};
