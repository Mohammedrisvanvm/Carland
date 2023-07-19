export interface IUser extends Document {
    _id:string
    userName: string,
    email: string,
    password: string,
    matchPassword: any

}
