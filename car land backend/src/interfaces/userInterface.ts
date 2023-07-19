export interface IUser extends Document {
    _id:string
    userName: String,
    email: String,
    password: String,
    matchPassword: any

}
