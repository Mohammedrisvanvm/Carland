export interface IUser extends Document {
    userName: String,
    email: String,
    password: String,
    matchPassword: any

}
