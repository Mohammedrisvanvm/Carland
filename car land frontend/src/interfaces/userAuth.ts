export interface Authcheck {
  data: {
    user: {
      _id: string,
      userName: string,
      email: string,
      password?: string,
      googleId?: string,
      image?: string,
      ban?: boolean,
      verified_email?: boolean,
    }
  }
}
export interface RootState {
  user: {
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