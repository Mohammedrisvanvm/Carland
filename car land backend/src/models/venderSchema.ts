import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import IVender from "../interfaces/venderInterface";


const VenderSchema:Schema=new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hubs:{
        type:[]
    }
    ,
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    image: {
        type: String,
    },
    verified_email: {
        type: Boolean,
    },
    ban: {
        type: Boolean,
        default:false
    }
},{timestamps:true})

VenderSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
VenderSchema.methods.matchPassword=async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const VenderModel=model<IVender>('vender',VenderSchema)
export default VenderModel