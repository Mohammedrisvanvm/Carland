interface IChat extends Document {
    messageText: String,
    sender:  Object,    
    roomId:string
    time: Date,
}
export default IChat;