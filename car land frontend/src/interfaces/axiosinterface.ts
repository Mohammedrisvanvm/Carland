import { AxiosRequestConfig } from "axios";
import { Vehicles } from "./vehicleInterface";
import { hub } from "./userAuth";
export interface AxiosResponse<T = any> {
  data?: {
    hubs?: hub[];
    message?: string;
    vehicles?: Vehicles[];
    vendors?:IVendor[]
  };
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
