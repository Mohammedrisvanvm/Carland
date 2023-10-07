import { Router } from "express";
import { bookCar, bookingConfirmDetails, bookingDetails, razorpayPayment, verifyRazorpayPayment } from "../../controllers/userController/booking";


const UserBookingRouter=Router()
UserBookingRouter.post('/bookcar',bookCar)
UserBookingRouter.post('/razorpay',razorpayPayment)
UserBookingRouter.post('/razorpayverify',verifyRazorpayPayment)
UserBookingRouter.get('/bookingconfirmdetails',bookingConfirmDetails)
UserBookingRouter.get('/bookingdetails',bookingDetails)

export default UserBookingRouter