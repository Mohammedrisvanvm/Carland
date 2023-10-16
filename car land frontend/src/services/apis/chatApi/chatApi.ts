import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { axiosBase } from "../../axios/axiosInstance";

export const getChatUser=async (id:string|null): Promise<AxiosResponse<any>> => {
    return axiosBase.get("chat/chatuser/"+id);
}
export const getConversations=async (id:string|null|undefined): Promise<AxiosResponse<any>> => {
    return axiosBase.get(`chat/conversations/${id}`);
}
export const createConversation=async (id:string|null|undefined,bookingId:string): Promise<AxiosResponse<any>> => {
    return axiosBase.post(`chat/createconversation/${id}/${bookingId}`);
}
export const getMessages=async (id:string|null|undefined): Promise<AxiosResponse<any>> => {
    return axiosBase.get("chat/messages/"+id);
}
interface IMessage {
    
    conversationId?: string;
    messageText?: string;
    recieverId?: string;
    senderId?: string|null;


  }
export const addNewMessage=async (message:IMessage): Promise<AxiosResponse<any>> => {
    return axiosBase.post("chat/addNewMessage/",{message});
}