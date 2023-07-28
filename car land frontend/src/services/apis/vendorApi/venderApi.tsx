import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const CarAdd = async(values: IAddcar): Promise<AxiosResponse<any>> => {
    console.log(values);
    
    return axiosBase.post("/vendors/vehicle/addvehicle", {values} )
  };