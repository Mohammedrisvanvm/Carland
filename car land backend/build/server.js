"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./config/mongoDB");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const userRouers_1 = __importDefault(require("./routers/userRouers"));
const VenderRouters_1 = __importDefault(require("./routers/VenderRouters"));
const adminRouters_1 = __importDefault(require("./routers/adminRouters"));
const errorHandlingMiddleware_1 = require("./middlewares/errorHandler/errorHandlingMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userCheckMiddleware_1 = require("./middlewares/userCheckMiddleware/userCheckMiddleware");
const app = (0, express_1.default)();
(0, mongoDB_1.DBconnect)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(userCheckMiddleware_1.userCheck);
app.use('/users', userRouers_1.default);
app.use('/vendors', VenderRouters_1.default);
app.use('/admin', adminRouters_1.default);
app.get('/', (req, res) => {
    res.send("hai");
});
app.use(errorHandlingMiddleware_1.notFound);
app.use(errorHandlingMiddleware_1.errorHandler);
app.listen(config_1.config.server.port, () => console.log('server connected @3131'));
//# sourceMappingURL=server.js.map