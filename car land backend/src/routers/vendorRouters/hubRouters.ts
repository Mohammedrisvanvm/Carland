import { Router } from "express";
import { addhub } from "../../controllers/venderController/hubController";

const hubRouters=Router()


hubRouters.post('/addhub',addhub)




export default hubRouters