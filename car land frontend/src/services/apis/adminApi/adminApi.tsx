import { AxiosResponse } from "axios";
import { axiosBase } from "../../axios/axiosInstance";

export const adminAuth=async (values:{}): Promise<AxiosResponse<any>> => {
    return axiosBase.post("admin/auth",{values});
}