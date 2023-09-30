interface IBook extends Document {
  _id: string;
  hubId: string;
  vehicleId: string;
  userId: string;
  bookingStartDate: Date;
  bookingEndDate: Date;
  time: string;
  status: boolean;
}


export default IBook