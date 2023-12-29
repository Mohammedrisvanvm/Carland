"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserCarRoutes_1 = __importDefault(require("./userAuthRouters/UserCarRoutes"));
const UserAuthRouters_1 = __importDefault(require("./userAuthRouters/UserAuthRouters"));
const UserStuffContoller_1 = __importDefault(require("./userAuthRouters/UserStuffContoller"));
const user_1 = require("../middlewares/Authorization/user");
const UserBooking_1 = __importDefault(require("./userAuthRouters/UserBooking"));
const router = (0, express_1.Router)();
router.use('/auth', UserAuthRouters_1.default);
router.use('/vehicle', UserCarRoutes_1.default);
router.use('/stuff', user_1.userAuthenticate, UserStuffContoller_1.default);
router.use('/booking', user_1.userAuthenticate, UserBooking_1.default);
exports.default = router;
//# sourceMappingURL=userRouters.js.map