import { Schema, model } from "mongoose";

const conversationSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
    },
    hubId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const conversationModel = model("conversation", conversationSchema);

export default conversationModel;
