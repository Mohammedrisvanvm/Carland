export interface Authcheck{
    data:{
      user:{
        _id:string,
        userName:string,
        password?:string,
        googleId?:string,
        image?: string,
        ban?:boolean,
        verified_email?: boolean,
      }
    }
  }