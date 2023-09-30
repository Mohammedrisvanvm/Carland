import { Router } from "express";
import { bookCar } from "../../controllers/userController/booking";


const UserBookingRouter=Router()
UserBookingRouter.post('/bookcar',bookCar)

export default UserBookingRouter