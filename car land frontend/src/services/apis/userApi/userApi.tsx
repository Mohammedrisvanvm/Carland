import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}): {} => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin=(value:{}):{}=>{
    return axiosBase.post("/users/auth/userLogin",{value})
}

export const userGoogleAuth=(value:{}):{}=>{
return axiosBase.post("/users/auth/userGoogleAuth",{value})
}
