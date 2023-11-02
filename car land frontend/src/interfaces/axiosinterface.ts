import { AxiosError, AxiosRequestConfig } from "axios";
import { Vehicles } from "./vehicleInterface";
import { hub, user } from "./userAuth";
import { Irazresponse } from "./razorpayInterface";
import { IConfirmBook, IConfirmBookWithImage } from "./bookingConfirmInterface";
import { IdashboardDetails } from "./dashboardInterface";
import { IConversation } from "./chatInterface";

export interface AxiosResponse<T = any> {
  data?: {
    hubs?: hub[];
    hub?: hub;
    message?: string;
    vehicles?: Vehicles[];
    count?: number;
    vehicle?: Vehicles;
    datesArray?: Date[];
    vendors?: IVendor[];
    users?: user[];
    user?: user;
    accessToken?: string;
    razorpay?: Irazresponse;
    id?: string;
    bookingDetails?: IConfirmBookWithImage[];
    bookingConfirmDetails?: IConfirmBook;
    dashboardDetails?: IdashboardDetails;
    salesReport?: IConfirmBook[];
    salesReportTotal?: number;
    location?: hubdata;
    status?: number;
    conversation?: IConversation[];
    statusText?: string;
    headers?: any;
    config?: AxiosRequestConfig;
    request?: any;
  };
}

interface hubdata {
  coords: {
    latitude: number;
    longitude: number;
  };
  placeName: string;
}
