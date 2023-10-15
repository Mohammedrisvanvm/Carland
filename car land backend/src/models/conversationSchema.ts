import { Mongoose, Schema, model } from "mongoose";



const conversationSchema: Schema = new Schema({
    members:{
     type:Array
    },
},{timestamps:true})


const chatModel = model("conversation", conversationSchema);

export default chatModel;