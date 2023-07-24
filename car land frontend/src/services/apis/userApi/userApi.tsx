
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}): {} => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin=(value:{}):{}=>{
    return axiosBase.post("/users/auth/userLogin",{value})
}

export const userGoogleAuth=(value:{}):Promise<AxiosResponse<any>>=>{
return axiosBase.post("/users/auth/userGoogleAuth",{value})
}

export const userCheck=():Promise<AxiosResponse<any>>=>{
return axiosBase.get("/users/auth/userCheck")
}
export const userLogout=():Promise<AxiosResponse>=>{
return axiosBase.get("/users/auth/userLogout")
}
