export interface user {
  _id: string;
  userName?: string | null;
  email: string | null;
  password?: string;
  verified_phonenumber:boolean|null
  googleId?: string;
  image?: string;
  gender?:string
  ban?: boolean;
  verified_email?: boolean;
  loading?: boolean;
  accessToken?: string | undefined;
  license: Array<string>;
  adhaar: Array<string>;
  profileVerificationRequest?:boolean
  verifiedProfile?:boolean
}
type Current = {
  latitude: number;
  longitude: number;
};
export interface hub{
  hubName: string;
  location?:Current
  _id?:string,
  isVerified?: boolean;
  ban?: boolean;
  placeName?:string;
  pincode: string;
  validityDate: Date|string;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}
export interface Authcheck {
  data?: {
    user?: user;
    vendor?: user;
    admin?: user;
    accessToken?: string;
    message?: string;
  }
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
