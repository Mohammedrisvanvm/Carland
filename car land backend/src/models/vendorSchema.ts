import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import IVender from "../interfaces/vendorInterface";


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
    renthubs:{
        type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'hub' }]
      
    }
    ,
    phoneNumber: {
        type: String,
        required:true,
        unique:true
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