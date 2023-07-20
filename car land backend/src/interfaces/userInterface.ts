 interface IUser extends Document {
    _id:string
    userName: string,
    email: string,
    password: string,
    googleId?:string,
    image?:string
    verified_email:boolean
   
}
interface IUser{
    matchPassword: any
}
export default IUser