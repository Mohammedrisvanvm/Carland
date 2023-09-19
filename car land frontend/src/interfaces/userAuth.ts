export interface user {
  _id?: string;
  userName?: string | null;
  email: string | null;
  password?: string;
  googleId?: string;
  image?: string;
  ban?: boolean;
  verified_email?: boolean;
  loading?: boolean;
  accessToken?: string | undefined;
}
export interface hub{
 
  _id:string,
  hubName: string;
  isVerified: boolean;
  ban: boolean;
  location: {
    lat:number,lng:number
  }|undefined;
  placeName?:string;
  pincode: string;
  validityDate: string;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}
export interface Authcheck {
  data: {
    user?: user;
    vendor?: user;
    admin?: user;
    accessToken?: string;
    message?: string;
  };
}
export interface RootState {
  user?: {
    _id?: string;
    userName?: string;
    email?: string;
    password?: string;
    googleId?: string;
    image?: string;
    ban?: boolean;
    verified_email?: boolean;
  };
  loading: boolean;
}

export interface Redux {
  _id: string;
  userName: string;
  email: string;
  password?: string;
  googleId?: string;
  image?: string;
  ban?: boolean;
  verified_email?: boolean;
}
