import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
// import { userCheck } from "../apis/userApi/userApi";
// import { Authcheck } from "../../interfaces/userAuth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/store/storeHook";
import { userCheck } from "../apis/userApi/userApi";
import { vendorLogout } from "../../redux/slice/vendorSlice";
import { Select } from "flowbite-react";
import { FC, ReactNode } from "react";
import { store } from "../../redux/store/store";
import { TokenObject, getToken } from "./tokenCheck";
import { userLogout } from "../../redux/slice/userSlice";

export const axiosBase = axios.create({
  baseURL: "http://localhost:3131/",
  timeout: 10000,
  withCredentials: true,
});

// type AxiosHookReturnType = {
//   onRequest: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
//   onRequestError: (error: AxiosError) => Promise<AxiosError>;
//   onResponse: (response: AxiosResponse) => AxiosResponse;
//   onResponseError: (error: AxiosError) => Promise<AxiosError>;
// };

//   export const useHook = (): AxiosHookReturnType => {
//     const user = useAppSelector((state) => state.user);

//   const onRequest = (
//     config: InternalAxiosRequestConfig
//   ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
//     console.info(`[request] [${JSON.stringify(config)}]`);
//     return config;
//   };
//   const onRequestError = (error: AxiosError): Promise<AxiosError> => {
//     console.error(`[request error] [${JSON.stringify(error)}]`);
//     return Promise.reject(error);
//   };
//   const onResponse = (response: AxiosResponse): AxiosResponse => {
//     console.info(`[response] [${JSON.stringify(response)}]`);
//     return response;
//   };

//   const onResponseError = (error: AxiosError): Promise<AxiosError> => {
//     console.error(`[response error] [${JSON.stringify(error)}]`);

//     return Promise.reject(error);
//   };

//   return {
//     onRequest,
//     onRequestError,
//     onResponse,
//     onResponseError,
//   };
// };

// const { onRequest, onRequestError, onResponse, onResponseError } = useHook();

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

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);


  return Promise.reject(error);
};
axiosBase.interceptors.request.use(onRequest, onRequestError);

axiosBase.interceptors.response.use(onResponse, onResponseError);
