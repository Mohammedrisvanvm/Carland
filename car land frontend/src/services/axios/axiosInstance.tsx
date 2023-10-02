import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store/storeHook";
import { userCheck } from "../apis/userApi/userApi";
import { vendorLogout } from "../../redux/slice/vendorSlice";
import { Select } from "flowbite-react";
import { FC, ReactNode } from "react";
import { store } from "../../redux/store/store";
import useAccessError, { AccessError, TokenObject, getToken } from "./tokenCheck";
import { userLogout } from "../../redux/slice/userSlice";


export const axiosBase = axios.create({
  baseURL: "http://localhost:3131/",
  timeout: 10000,
  withCredentials: true,
});


const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  // const token: string|null  = getToken();
  // config.headers.Authorization = `${token}`;
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};
interface AxiosError1{
response:{
  data:{
    message:string
  }
}
}
const onResponseError = async(error: AxiosError1): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  const {dispatch} = store

  if (error.response?.data && typeof error.response.data.message === 'string') {
    const message = error.response.data.message;
    if (message === 'Access Denied') {
      dispatch(userLogout())
    
    }
  }

  return Promise.reject(error);
};
axiosBase.interceptors.request.use(onRequest, onRequestError);

axiosBase.interceptors.response.use(onResponse, onResponseError);
