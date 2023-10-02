import { AxiosError, AxiosRequestConfig } from "axios";
import { Vehicles } from "./vehicleInterface";
import { hub, user } from "./userAuth";
import { Irazresponse } from "./razorpayInterface";
import { IConfirmBook } from "./bookingConfirmInterface";
export interface AxiosResponse<T = any> {
  data?: {
    hubs?: hub[];
    message?: string;
    vehicles?: Vehicles[];
    count?:number
    vehicle?:Vehicles
    vendors?:IVendor[]
    users?:user[]
    accessToken?: string;
    razorpay?:Irazresponse
    id?:string,
    bookingDetails?:IConfirmBook
  };
  status?: number;
  statusText?: string;
  headers?: any;
  config?: AxiosRequestConfig;
  request?: any;
  
}
