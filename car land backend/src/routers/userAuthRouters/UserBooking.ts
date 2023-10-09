import { Router } from "express";
import { bookCar, bookingConfirmDetails, bookingDetails, cancelBooking, pickupReq, razorpayPayment, verifyRazorpayPayment } from "../../controllers/userController/booking";


const UserBookingRouter=Router()
UserBookingRouter.post('/bookcar',bookCar)
UserBookingRouter.post('/razorpay',razorpayPayment)
UserBookingRouter.post('/razorpayverify',verifyRazorpayPayment)
UserBookingRouter.get('/bookingconfirmdetails',bookingConfirmDetails)
UserBookingRouter.get('/bookingdetails',bookingDetails)
UserBookingRouter.patch('/pickupReq',pickupReq)
UserBookingRouter.patch('/cancelbooking',cancelBooking)

export default UserBookingRouter