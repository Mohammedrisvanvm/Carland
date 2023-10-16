import { Schema, model } from "mongoose";
import IChat from "../interfaces/chatInterface";

const chatSchema: Schema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const chatModel = model<IChat>("chat", chatSchema);

export default chatModel;
