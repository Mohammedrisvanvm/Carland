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
export const getAllHubs=async (search:string): Promise<AxiosResponse<any>>=>{
    return axiosBase.get(`/admin/hubmanagement/allhubs?search=${search}`)
}
export const getAllCars=async (search:string): Promise<AxiosResponse<any>>=>{
    return axiosBase.get(`/admin/carmanagement/allcars?search=${search}`)
}
export const banUser=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/admin/usermanagement/banuser",{value})
}
export const verifyProfile=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/admin/usermanagement/verifyprofile",{value})
}
export const banVendor=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/admin/vendormanagement/banvendor",{value})
}

export const banHub=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.post("/admin/hubmanagement/banhub",{value})
}
export const Verifyhub=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.patch("/admin/hubmanagement/verifyhub",{value})
}
export const VerifyCar=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.patch("/admin/carmanagement/verifycar",{value})
}
export const banCar=async (value:string|undefined): Promise<AxiosResponse<any>>=>{
    return axiosBase.patch("/admin/carmanagement/bancar",{value})
}