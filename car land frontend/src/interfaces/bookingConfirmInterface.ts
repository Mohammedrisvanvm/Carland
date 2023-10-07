

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
  bookingEndDate: Date;
  pickuptime: string;
  image:string
  paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
  paymentStatus: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface IConfirmBookWithImage  {
_doc:IConfirmBook,
image:string
}

