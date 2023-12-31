"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./config/mongoDB");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const userRouters_1 = __importDefault(require("./routers/userRouters"));
const VendorRouters_1 = __importDefault(require("./routers/VendorRouters"));
const adminRouters_1 = __importDefault(require("./routers/adminRouters"));
const chatRouters_1 = __importDefault(require("./routers/chatRouters"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./config/socket");
const socket_io_1 = require("socket.io");
const errorHandlingMiddleware_1 = require("./middlewares/errorHandler/errorHandlingMiddleware");
exports.app = (0, express_1.default)();
//socket.io server
const newserver = http_1.default.createServer(exports.app);
const io = new socket_io_1.Server(newserver, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://carland-five.vercel.app",
            "https://carlandpro.netlify.app",
            "ws://carland.eshopsport.store",
        ],
        credentials: true,
    },
});
(0, socket_1.socketConnect)(io);
(0, mongoDB_1.DBconnect)();
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use(express_1.default.urlencoded({ extended: false, limit: "50mb" }));
exports.app.use(express_1.default.static(path_1.default.resolve() + "/public"));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://carland-five.vercel.app",
        "https://carlandpro.netlify.app",
    ],
    credentials: true,
}));
exports.app.use("/users", userRouters_1.default);
exports.app.use("/vendors", VendorRouters_1.default);
exports.app.use("/admin", adminRouters_1.default);
exports.app.use("/chat", chatRouters_1.default);
exports.app.get("/", (req, res) => {
    res.send("hai");
});
exports.app.use(errorHandlingMiddleware_1.notFound);
exports.app.use(errorHandlingMiddleware_1.errorHandler);
newserver.listen(config_1.config.server.port, () => console.log("server connected @3131"));
//# sourceMappingURL=server.js.map