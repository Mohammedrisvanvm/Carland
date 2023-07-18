import mongoose, { Schema, model,Document } from "mongoose";
import bcrypt from 'bcrypt'

interface Iuser extends Document {
    userName: String,
    email: String,
    password: String,

}

const userSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    } )
    
    
    userSchema.methods.matchPassword=async function(enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password )
    }
const userModel = model<Iuser>('user',userSchema)
export default userModel