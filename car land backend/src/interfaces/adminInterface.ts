 interface IAdmin extends Document{
    _id:string,
    email:string,
    password:string,
    matchPassword:any,
    accessToken?:string|null
}

export default IAdmin