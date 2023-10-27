interface IChat extends Document {
    messageText: string,
    senderId:  string,    
    conversationId:string
    recieverId:string
    createdAt:Date
}
export default IChat;

export interface Iconversation {
    _id: string;
    hubId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  