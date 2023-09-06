import { AxiosResponse } from "axios";
import { axiosBase } from "../../axios/axiosInstance";

export const adminAuth=async (): Promise<AxiosResponse<any>> => {
    return axiosBase.post("/admin/login");
}
