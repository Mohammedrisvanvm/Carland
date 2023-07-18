import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}): {} => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin=(value:{}):{}=>{
    return axiosBase.post("/users/auth/userLogin",{value})
}
