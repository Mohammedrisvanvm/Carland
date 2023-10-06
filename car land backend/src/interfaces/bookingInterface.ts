interface IBook extends Document {
  _id: string;
  hubId: string;
  vehicleId: string;
  userId: string;
  hubName:string,
  vehicleName:string,
  bookingStartDate: Date;
  totalPrice: number;
  carPrice:number
  days: number;
  bookingEndDate: Date;
  paymentDetails:{
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }
  paymentStatus:string
  status: boolean;
}
interface IBookWithTimestamps extends IBook {
  save(): unknown;
  createdAt: Date;
  updatedAt: Date;
}
export default IBookWithTimestamps;
