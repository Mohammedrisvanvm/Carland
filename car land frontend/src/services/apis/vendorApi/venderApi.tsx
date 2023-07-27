import { axiosBase } from "../../axios/axiosInstance";


export const addCar=(value: {}): {} => {
return axiosBase.post("/vendors/vehicle/addvehicle",{value})
}