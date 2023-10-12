import { Schema, model } from "mongoose";
import IChat from "../interfaces/chatInterface";



const chatSchema: Schema = new Schema(
   {
        messageText: {
            type: String,
            required: true,
        },
        sender: {
            type: Object,
            required: true,
        },
        roomId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        time: {
            type: Date,
            default: new Date(),
        },
    })
    
    const chatModel = model<IChat>("chat", chatSchema);

    export default chatModel;
