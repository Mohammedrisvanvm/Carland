interface Ihub extends Document {
  save(): unknown;
  _id:string,
  hubName: string;
  isVerified: Boolean;
  ban: Boolean;
  location: Location;
  place?:object;
  pincode: Number;
  vehicles:Array<string>
  validityDate: Date;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}

export default Ihub
