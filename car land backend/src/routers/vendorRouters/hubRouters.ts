import { Router } from "express";
import { addhub, dashboardDetails, getHubs } from "../../controllers/venderController/hubController";

const hubRouters=Router()


hubRouters.post('/addhub',addhub)
hubRouters.get('/gethubs',getHubs)
hubRouters.get('/dashboard',dashboardDetails)




export default hubRouters