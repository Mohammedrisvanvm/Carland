 interface IUser extends Document {
    save(): unknown;
    _id: string;
    userName: string;
    email: string;
    password?: string;
    googleId?: string;
    image?: string;
    verified_email?: boolean;
    ban?: boolean;
    createdAt: Date;
    updatedAt: Date;
   
}
interface IUser{
    matchPassword: any
}
export default IUser
