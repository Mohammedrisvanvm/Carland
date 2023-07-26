interface IVender extends Document {
    _id: string;
    userName: string;
    email: string;
    password?: string;
    cabhub:Array<string>
    renthub:Array<string>
    googleId?: string;
    image?: string;
    verified_email?: boolean;
    ban?: boolean;
    createdAt: Date;
    updatedAt: Date;
   
}
interface IVender{
    matchPassword: Function
}
export default IVender