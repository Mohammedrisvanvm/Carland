import { Schema, model } from "mongoose";
import IAdmin from "../interfaces/adminInterface";
import bcrypt from 'bcrypt'



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
adminSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}
const adminModel = model<IAdmin>('admin', adminSchema)
export default adminModel