import { Schema, model } from "mongoose";

const conversationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    hubId: {
      type: Schema.Types.ObjectId,
      ref: "hub",
    },
  },
  { timestamps: true }
);

const conversationModel = model("conversation", conversationSchema);

export default conversationModel;
