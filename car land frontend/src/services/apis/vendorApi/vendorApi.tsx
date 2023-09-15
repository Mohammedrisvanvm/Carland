import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { IHub } from "../../../test/test";
import { axiosBase } from "../../axios/axiosInstance";

export const CarAdd = async (values: IAddcar,id:string|undefined|null): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/vendors/vehicle/addvehicle", { values,id });
};
export const HubAdd = async (values: IHub): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/vendors/hub/addhub", { values });
};
export const getHub = async (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/vendors/hub/gethubs");
};
export const getVehicle = async (hubId:string|null|undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/vehicle/getvehicles?hubId=${hubId}`)
};
export const VendorAuthSignUp = async (values: {}): Promise<
  AxiosResponse<any>
> => {
  return axiosBase.post("/vendors/auth/vendorsignup", { values });
};
export const VendorAuthLogin = async (values: {}): Promise<
  AxiosResponse<any>
> => {
  return axiosBase.post("/vendors/auth/vendorlogin", { values });
};
export const VendorOtpVerify = async (
  value: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/vendors/auth/vendorotpverify", { value });
};
export const vendorSignOut = async (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/vendors/auth/vendorlogout");
};
