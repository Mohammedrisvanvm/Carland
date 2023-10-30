import { Router } from "express";
import { addhub, dashboardDetails, getHubs, profileData } from "../../controllers/venderController/hubController";

const hubRouters=Router()


hubRouters.post('/addhub',addhub)
hubRouters.get('/gethubs',getHubs)
hubRouters.get('/profile',profileData)
hubRouters.get('/dashboard',dashboardDetails)




export default hubRouters