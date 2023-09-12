interface Ihub extends Document {
  hubName: string;
  isVerified: Boolean;
  ban: Boolean;
  location: Location;
  pincode: Number;
  validityDate: Date;
  licence: String;
  hubImage: String;
  hubMultiImage: Array<string>;
}

export default Ihub
