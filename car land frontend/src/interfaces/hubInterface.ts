interface Ihub {
  _id?: string;
  hubName: string;
  isVerified?: boolean | undefined;
  ban?: boolean;
  place?: string;
  pincode: string;
  location: { latitude: number; longitude: number };
  validityDate: string;
  license: string;
  hubImage: string;
  hubMultiImage: Array<string>;
}

export default Ihub;
