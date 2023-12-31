import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { hub } from "../../../interfaces/userAuth";

import { axiosBase } from "../../axios/axiosInstance";

export const CarAdd = async (
  values: IAddcar,
  id: string | undefined | null
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/vendors/vehicle/addvehicle", { values, id });
};
export const HubAdd = async (values: hub): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/vendors/hub/addhub", { values });
};
export const getHub = async (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/vendors/hub/gethubs");
};
export const getVehicle = async (
  hubId: string | null | undefined,
  search: string
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/vendors/vehicle/getvehicles?hubId=${hubId}&search=${search}`
  );
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
export const getBookings = async (id: string | null | undefined,search:string,currentPage:number): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/bookings/getBookings?hubID=${id}&search=${search}&currentPage=${currentPage}`);
};
export const  pickUpreqAction= async (id: string | null | undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/bookings/pickupreqaction?bookingID=${id}`);
};
export const dropOffreqAction= async (id: string | null | undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.patch(`/vendors/bookings/dropoffreqaction?bookingID=${id}`);
};
export const dashboardDetails= async (id: string | null | undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/hub/dashboard?hubId=${id}`);
};
export const vendorProfile= async (id: string | null | undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/hub/profile?hubId=${id}`);
};
export const updateProfileHub= async (license:string| null,imageMain:string| null,imageSub:string| null,validityDate:string|null,hubId: string | null | undefined): Promise<AxiosResponse<any>> => {
  return axiosBase.patch('/vendors/hub/profile/update',{license,imageMain,imageSub,validityDate,hubId});
};
export const salesReportsVendor = async (id: string | null | undefined,search:string,currentPage:number): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/vendors/bookings/salesreports?hubID=${id}&search=${search}&currentPage=${currentPage}`);
};
