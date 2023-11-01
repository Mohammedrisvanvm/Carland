import { Router } from "express";
import { addhub, dashboardDetails, getHubs, profileData, profileDataUpdate } from "../../controllers/venderController/hubController";

const hubRouters=Router()


hubRouters.post('/addhub',addhub)
hubRouters.get('/gethubs',getHubs)
hubRouters.get('/profile',profileData)
hubRouters.patch('/profile/update',profileDataUpdate)
hubRouters.get('/dashboard',dashboardDetails)




export default hubRouters