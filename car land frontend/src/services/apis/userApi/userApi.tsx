import { axiosBase } from "../../axios/axiosInstance"


export const userSignUp=(value:{}):{}=>{


    return axiosBase.post('/users/auth/userSignUp',{value})
}