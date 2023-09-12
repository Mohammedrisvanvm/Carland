import { Router } from "express";
import { addhub, getHubs } from "../../controllers/venderController/hubController";

const hubRouters=Router()


hubRouters.post('/addhub',addhub)
hubRouters.get('/gethubs',getHubs)




export default hubRouters