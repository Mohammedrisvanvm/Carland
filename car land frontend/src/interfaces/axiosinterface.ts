import { AxiosError, AxiosRequestConfig } from "axios";
import { Vehicles } from "./vehicleInterface";
import { hub, user } from "./userAuth";
import { Irazresponse } from "./razorpayInterface";
import { IConfirmBook, IConfirmBookWithImage } from "./bookingConfirmInterface";
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
    bookingDetails?:IConfirmBookWithImage[]
    bookingConfirmDetails?:IConfirmBook
  };
  status?: number;
  statusText?: string;
  headers?: any;
  config?: AxiosRequestConfig;
  request?: any;
  
}
