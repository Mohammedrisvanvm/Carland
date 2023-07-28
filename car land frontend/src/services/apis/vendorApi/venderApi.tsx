import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const CarAdd = async(values: IAddcar): Promise<AxiosResponse<any>> => {
    
    
    return axiosBase.post("/vendors/vehicle/addvehicle", {values} )
  };
  export const getVehicle = async(): Promise<AxiosResponse<any>> => {
    return axiosBase.get("/vendors/vehicle/getvehicles")
  };