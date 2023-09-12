interface Ihub extends Document {
  hubName: string;
  isVerified: Boolean;
  ban: Boolean;
  location: Location;
  place?:string;
  pincode: Number;
  validityDate: Date;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}

export default Ihub
