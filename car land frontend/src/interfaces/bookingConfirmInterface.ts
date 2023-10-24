export interface IConfirmBook extends Document {
  _id: string;
  hubId: string;
  vehicleId: string;
  userId: string;
  hubName: string;
  vehicleName: string;
  bookingStartDate: Date;
  totalPrice: number;
  carPrice: number;
  days: number;
  bookingEndDate: string;
  pickuptime: string;
  image: string;
  paymentDetails?: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
  paymentStatus: string;
  status: string;
  tempStatus: string;
  locationName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConfirmBookWithImage {
  _doc: IConfirmBook;
  image: string;
  hubLatitude: number;
  hubLongitude: number;
}
