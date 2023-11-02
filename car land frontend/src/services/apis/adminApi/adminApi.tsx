import { AxiosResponse } from "axios";
import { axiosBase } from "../../axios/axiosInstance";

export const adminAuth = async (values: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("admin/auth", { values });
};
export const adminSignOut = async (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("admin/auth/logout");
};
export const getAllUser = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/usermanagement/allusers?search=${search}&currentPage=${currentPage}`
  );
};
export const getAllVendors = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/vendormanagement/allvendors?search=${search}&currentPage=${currentPage}`
  );
};
export const getAllHubs = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/hubmanagement/allhubs?search=${search}&currentPage=${currentPage}`
  );
};
export const getAllCars = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/carmanagement/allcars?search=${search}&currentPage=${currentPage}`
  );
};
export const banUser = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/admin/usermanagement/banuser", { value });
};
export const verifyProfile = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/admin/usermanagement/verifyprofile", { value });
};
export const banVendor = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/admin/vendormanagement/banvendor", { value });
};

export const banHub = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/admin/hubmanagement/banhub", { value });
};
export const Verifyhub = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.patch("/admin/hubmanagement/verifyhub", { value });
};
export const VerifyCar = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.patch("/admin/carmanagement/verifycar", { value });
};
export const banCar = async (
  value: string | undefined
): Promise<AxiosResponse<any>> => {
  return axiosBase.patch("/admin/carmanagement/bancar", { value });
};
export const getBookingsManagement = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/bookingmanagement/allbookings?search=${search}&currentPage=${currentPage}`
  );
};
export const dashboardDetailsAdmin = async (): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/admin/dashboard/dashboardDetails`);
};
export const salesReportsAdmin = async (
  search: string,
  currentPage: number
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/admin/salesreport/fetchreport?search=${search}&currentPage=${currentPage}`
  );
};
