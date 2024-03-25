"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hubController_1 = require("../../controllers/venderController/hubController");
const hubRouters = (0, express_1.Router)();
hubRouters.post('/addhub', hubController_1.addhub);
hubRouters.get('/gethubs', hubController_1.getHubs);
hubRouters.get('/profile', hubController_1.profileData);
hubRouters.patch('/profile/update', hubController_1.profileDataUpdate);
hubRouters.get('/dashboard', hubController_1.dashboardDetails);
exports.default = hubRouters;
//# sourceMappingURL=hubRouters.js.map