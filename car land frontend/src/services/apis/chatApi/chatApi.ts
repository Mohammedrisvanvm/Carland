import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const getChatUser=async (id:string|null): Promise<AxiosResponse<any>> => {
    return axiosBase.get("chat/chatuser/"+id);
}
export const getConversations=async (id:string|null): Promise<AxiosResponse<any>> => {
    return axiosBase.get("chat/conversations/"+id);
}
export const getMessages=async (id:string|null|undefined): Promise<AxiosResponse<any>> => {
    return axiosBase.get("chat/messages/"+id);
}