import { Router } from "express";

import { dashboardDetailsAdmin } from "../../controllers/adminController/dashboardManagement";

const adminDashboard=Router()

adminDashboard.get('/dashboardDetails',dashboardDetailsAdmin)


export default adminDashboard