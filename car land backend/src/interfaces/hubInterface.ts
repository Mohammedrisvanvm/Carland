interface Ihub  {
  save(): unknown;
  _id: string;
  hubName: string;
  isVerified: Boolean;
  ban: Boolean;
  location: {
    lat: number;
    lng: number;
  }
  placeName:string
  pincode: number;
  vehicles: Array<string>;
  validityDate: Date;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}

export default Ihub;
