interface IChat extends Document {
    messageText: string,
    senderId:  string,    
    conversationId:string
    recieverId:string
    createdAt:Date
}
export default IChat;