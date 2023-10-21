import { promises } from "dns";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const userSignUp = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userSignUp", { value });
};
export const userLogin = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userLogin", { value });
};
export const userOtpVerify = (value: number): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userotpcheck", { value });
};

export const userGoogleAuth = (value: {}): Promise<AxiosResponse<any>> => {
  return axiosBase.post("/users/auth/userGoogleAuth", { value });
};

export const userCheck = (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/users/auth/userCheck");
};

export const currrentUserFetch = (): Promise<AxiosResponse<any>> => {
  return axiosBase.get("/users/stuff/currrentuser");
};
export const userSignOut = (): Promise<AxiosResponse> => {
  return axiosBase.get("/users/auth/userLogout");
};
export const userGetVehicle = async (
  currentPage: number,
  search: string,
  filter: string,
  latitude: number | null,
  longitude: number | null,
  seletedDate: string[]|string
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(
    `/users/vehicle/getvehicles?currentPage=${currentPage}&search=${search}&filter=${filter}&lat=${
      latitude ? latitude : ""
    }&lng=${longitude ? longitude : ""}&seletedDate=${seletedDate}`
  );
};
export const userSingleGetVehicle = async (
  id: String | null
): Promise<AxiosResponse<any>> => {
  return axiosBase.get(`/users/vehicle/singleCar?id=${id}`);
};
export const userVerifyNumber = async (
  phoneNumber: number
): Promise<AxiosResponse> => {
  return await axiosBase.post("/users/stuff/verifynumber", { phoneNumber });
};
export const userVerifyNumberOtp = async (
  otp: number
): Promise<AxiosResponse> => {
  return await axiosBase.post("/users/stuff/verifyotp", { otp });
};
export const userprofileData = async (
  gender: string,
  userName: string | null | undefined
): Promise<AxiosResponse> => {
  return await axiosBase.patch("/users/stuff/userprofileData", {
    gender,
    userName,
  });
};

export const ProfileVerificationData = async (
  formData: FormData
): Promise<AxiosResponse> => {
  return await axiosBase.put("/users/stuff/ProfileVerificationData", formData, {
    headers: {},
  });
};

export const bookingCar = async (data: data): Promise<AxiosResponse> => {
  console.log(data);

  return await axiosBase.post("/users/booking/bookcar", { data });
};
export const verifyRazorpayPayment = async (
  data: Iresponse
): Promise<AxiosResponse> => {
  console.log(data);

  return await axiosBase.post("/users/booking/razorpayverify", { data });
};
type Iresponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type data = {
  pickUpDate: string;
  dropOffDate: string;
  carId: string | null;
  razorpay_signature?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
};
export const razorpayApi = async (data: data): Promise<AxiosResponse> => {
  console.log(data);

  return await axiosBase.post("/users/booking/razorpay", { data });
};
export const bookingconfirmdetails = async (
  bookingID: string | undefined
): Promise<AxiosResponse> => {
  return await axiosBase.get(
    `/users/booking/bookingconfirmdetails?bookingID=${bookingID}`
  );
};

export const bookingdetails = async (): Promise<AxiosResponse> => {
  return await axiosBase.get(`/users/booking/bookingdetails`);
};
export const pickupReq = async (id: string): Promise<AxiosResponse> => {
  return await axiosBase.patch(`/users/booking/pickupReq?bookingID=${id}`);
};
export const cancelBooking = async (id: string): Promise<AxiosResponse> => {
  return await axiosBase.patch(`/users/booking/cancelbooking?bookingID=${id}`);
};
export const dropOffReq = async (id: string): Promise<AxiosResponse> => {
  return await axiosBase.patch(`/users/booking/dropoffreq?bookingID=${id}`);
};
