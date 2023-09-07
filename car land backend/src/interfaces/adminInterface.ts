 interface IAdmin extends Document{
    _id:string,
    email:string,
    password:string,
    matchPassword:any
}

export default IAdmin