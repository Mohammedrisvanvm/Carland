import { Schema, model } from "mongoose";
import IChat from "../interfaces/chatInterface";



const chatSchema: Schema = new Schema(
   {
        messageText: {
            type: String,
            required: true,
        },
        vendorId: {
            type: Schema.Types.ObjectId,
            ref: 'vender',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        date: {
            type: Date,
            default: Date.now,
        },
    })
    
    const chatModel = model<IChat>("chat", chatSchema);

    export default chatModel;
