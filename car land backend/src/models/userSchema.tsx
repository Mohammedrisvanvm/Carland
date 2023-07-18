import mongoose, { Schema, model,Document } from "mongoose";

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
})


const userModel = model<Iuser>('user',userSchema)