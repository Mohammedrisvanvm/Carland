import { Schema, model } from "mongoose";



const conversationSchema: Schema = new Schema({
    members:{
     type:Array
    },
},{timestamps:true})


const conversationModel = model("conversation", conversationSchema);

export default conversationModel;