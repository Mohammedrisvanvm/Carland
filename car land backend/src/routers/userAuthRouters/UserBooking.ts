import { Router } from "express";
import { bookCar, razorpayPayment, verifyRazorpayPayment } from "../../controllers/userController/booking";


const UserBookingRouter=Router()
UserBookingRouter.post('/bookcar',bookCar)
UserBookingRouter.post('/razorpay',razorpayPayment)
UserBookingRouter.post('/razorpayverify',verifyRazorpayPayment)

export default UserBookingRouter