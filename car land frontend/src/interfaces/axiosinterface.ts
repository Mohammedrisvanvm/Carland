import { AxiosRequestConfig } from "axios";
import { Vehicles } from "./vehicleInterface";
import { hub, user } from "./userAuth";
export interface AxiosResponse<T = any> {
  data?: {
    hubs?: hub[];
    message?: string;
    vehicles?: Vehicles[];
    vendors?:IVendor[]
    users?:user[]
    accessToken?: string;
  };
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
