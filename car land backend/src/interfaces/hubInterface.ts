interface Ihub  {
  save(): unknown;
  _id: string;
  hubName: string;
  isVerified: boolean;
  ban: boolean;
  location: {
    latitude: number;
    longitude: number;
  }
  placeName:string
  pincode: number;
  vehicles: Array<string>;
  validityDate: Date;
  license: string;
  // hubImage: string|image
  hubImage: string
  hubMultiImage: Array<string>;
 
}
type image = {
  url?: string;
  publicid?: string;
};

export default Ihub;
