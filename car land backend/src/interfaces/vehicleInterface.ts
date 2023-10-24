interface IVehicle extends Document {
  save(): unknown;
  _id: string;
  vehicleName: string;
  vehicleNumber: string;
  image: Array<string>;
  year: string;
  colour: string;
  fuel: string;
  numofseats: number;
  hubName: string;
  mileage: number;
  fairPrice: number;
  fairKm: number;
  status: boolean;
  specification: Array<string>;
  vehicleValidate: Date;
  DocumentVehicle: string;
  vehiclesingleimage: string;
  vehiclemultipleimage: Array<string>;
   singleImage?: string;
  SubImages?: Array<string>;
  vehicleValidityDate: string;
  hubId?: string;
  ban: boolean;
  isVerified: boolean;
  bookingDates: {
    pickUp: Date[];
    dropOff: Date[];
  };
   placeName?:string
}
interface IVehicle {
  vehicleData: IVehicle[];
 
}

export default IVehicle;
