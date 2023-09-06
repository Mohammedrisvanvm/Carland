 interface IAdmin extends Document{
    _id:string,
    email:string,
    password:string,
    matchPassword:Function
}

export default IAdmin