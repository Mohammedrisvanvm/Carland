import { axiosBase } from "../../axios/axiosInstance";


export const addCar=(value:IAddcar):{}=>{
return axiosBase.post("/vendors/vehicle/addvehicle",{value})
}