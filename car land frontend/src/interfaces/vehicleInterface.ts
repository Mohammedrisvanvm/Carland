export interface Vehicles {
  _id: string;
  vehicleName: string;
  vehicleNumber: string;
  year: string;
  image: Array<string>;
  colour: string;
  fuel: string;
  numofseats: number;
  hubName: string;
  mileage: number;
  fairPrice: number;
  fairKm: number;
  status: boolean;
DocumentVehicle:string
  specification: Array<string>;
  vehicleValidate: Date;
  documents: Array<string>;
  singleImage: string;
  SubImages: Array<string>;
  vehicleValidityDate: string;
  isVerified: boolean;
  bookingDates?: {
    pickUp: string[];
    dropOff: string[];
  };
  ban: boolean;
  placeName?:string
}
