 interface IUser extends Document {
    _id:string
    userName: string,
    email: string,
    password: string,
   
}
interface IUser{
    matchPassword: any
}
export default IUser