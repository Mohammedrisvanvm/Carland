import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import IVender from "../interfaces/vendorInterface";


const VendorSchema:Schema=new Schema({
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
        type:[{ type: mongoose.Schema.Types.ObjectId }]
      
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

VendorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
VendorSchema.methods.matchPassword=async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const VendorModel=model<IVender>('vender',VendorSchema)
export default VendorModel