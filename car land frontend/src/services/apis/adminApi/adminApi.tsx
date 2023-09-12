import { AxiosResponse } from "axios";
import { axiosBase } from "../../axios/axiosInstance";

export const adminAuth=async (values:{}): Promise<AxiosResponse<any>> => {
    return axiosBase.post("admin/auth",{values});
}
export const adminSignOut=async (): Promise<AxiosResponse<any>> => {
    return axiosBase.get("admin/auth/logout");
}
export const getAllUser=async (): Promise<AxiosResponse<any>>=>{
    return axiosBase.get("/admin/usermanagement/allusers")
}
export const getAllVendors=async (): Promise<AxiosResponse<any>>=>{
    return axiosBase.get("/admin/vendormanagement/allvendors")
}
export const banUser=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/admin/usermanagement/banuser",{value})
}
