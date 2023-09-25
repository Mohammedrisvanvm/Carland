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
  phone_number?: number;
  verified_phonenumber?: boolean;
  gender?: string;
  license?: Array<String>;
  adhaar?: Array<String>;
  profileVerificationRequest?:boolean
  verifiedProfile?:boolean
  createdAt: Date;
  updatedAt: Date;
}
interface IUser {
  matchPassword: any;
}
export default IUser;
