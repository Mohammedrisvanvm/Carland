interface IVehicle extends Document {
  save(): unknown;
  _id: string;
  vehicleName: string;
  vehicleNumber: string;
  image: Array<string>;
  year: string;
  colour: string;
  fuel: string;
  numofseats: Number;
  hubName: string;
  mileage: Number;
  fairPrice: Number;
  fairKm: Number;
  status: Boolean;
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
    pickUp: string[];
    dropOff: string[];
  };
}
interface IVehicle {
  vehicleData: IVehicle[];
}

export default IVehicle;
