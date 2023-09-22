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
// import { setUser } from "../../redux/Slices/UserSlice/UserSlice";

// const vendor =useAppSelector((state)=>state.vendor)

export const axiosBase = axios.create({
  baseURL: "http://localhost:3131/",
  timeout: 10000,
  withCredentials: true,
});

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {

  
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
