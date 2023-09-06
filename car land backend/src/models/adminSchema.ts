import { Schema, model } from "mongoose";
import IAdmin from "../interfaces/adminInterface";



const adminSchema:Schema=new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
})
const adminModel = model<IAdmin>('user', adminSchema)
export default adminModel