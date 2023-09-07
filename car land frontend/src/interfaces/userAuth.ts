export interface user{
    _id: string,
    userName: string,
    email: string|null
    password?: string,
    googleId?: string,
    image?: string,
    ban?: boolean,
    verified_email?: boolean,
    loading?:boolean
  
}
export interface Authcheck {
  data: {
    user: user
   message?:string
  }
}
export interface RootState {
  user?: {
    _id?: string,
    userName?: string,
    email?: string,
    password?: string,
    googleId?: string,
    image?: string,
    ban?: boolean,
    verified_email?: boolean,
  }
  loading: boolean
}


export interface Redux {
  _id: string,
  userName: string,
  email: string,
  password?: string,
  googleId?: string,
  image?: string,
  ban?: boolean,
  verified_email?: boolean,
}