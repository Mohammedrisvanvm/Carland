import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { adminLogout } from "../../redux/slice/adminSlice";
import { userLogout } from "../../redux/slice/userSlice";
import { vendorLogout } from "../../redux/slice/vendorSlice";
import { store } from "../../redux/store/store";
const baseURL: string = import.meta.env.VITE_BASEURL;

export const axiosBase = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  withCredentials: true,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  console.info(`[request] [${JSON.stringify(config)}]`);

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${error.message}]`);

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response.data)}]`);
  return response;
};
interface AxiosError1 {
  response: {
    data: {
      message: string;
    };
  };
}
const onResponseError = async (error: AxiosError1): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  const { dispatch } = store;
  console.log(121212, error.response?.data);

  if (error.response?.data && typeof error.response.data.message === "string") {
    const message = error.response.data.message;
    console.log(message);

    if (message === "User Access Denied") {
      dispatch(userLogout());
    } else if (message === "Vendor Access Denied") {
      dispatch(vendorLogout());
    } else if (message === "Admin Access Denied") {
      dispatch(adminLogout());
    }
  }

  return Promise.reject(error);
};
axiosBase.interceptors.request.use(onRequest, onRequestError);

axiosBase.interceptors.response.use(onResponse, onResponseError);
