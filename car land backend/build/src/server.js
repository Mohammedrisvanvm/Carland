"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const mongoDB_1 = require("./config/mongoDB");
const VendorRouters_1 = __importDefault(require("./routers/VendorRouters"));
const adminRouters_1 = __importDefault(require("./routers/adminRouters"));
const chatRouters_1 = __importDefault(require("./routers/chatRouters"));
const userRouters_1 = __importDefault(require("./routers/userRouters"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const credentials_1 = __importStar(require("./middlewares/credentials"));
const errorHandlingMiddleware_1 = require("./middlewares/errorHandler/errorHandlingMiddleware");
const newSocket_1 = require("./utils/newSocket");
exports.app = (0, express_1.default)();
//socket.io server
const newserver = http_1.default.createServer(exports.app);
// const io = new Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >(newserver, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://carland-five.vercel.app",
//       "https://carlandpro.netlify.app",
//       "ws://carland.eshopsport.store",
//     ],
//     credentials: true,
//   },
// });
// socketConnect(io);
new newSocket_1.ServerSocket(newserver);
(0, mongoDB_1.DBconnect)();
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use(express_1.default.urlencoded({ extended: false, limit: "50mb" }));
exports.app.use(express_1.default.static(path_1.default.resolve() + "/public"));
exports.app.use((0, cookie_parser_1.default)());
console.log(process.env.RAZO_KEY_ID);
exports.app.use(credentials_1.default);
exports.app.use((0, cors_1.default)({
    origin: credentials_1.allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}));
exports.app.use("/users", userRouters_1.default);
exports.app.use("/vendors", VendorRouters_1.default);
exports.app.use("/admin", adminRouters_1.default);
exports.app.use("/chat", chatRouters_1.default);
exports.app.get("/", (req, res) => {
    res.send("health checked");
});
exports.app.use(errorHandlingMiddleware_1.notFound);
exports.app.use(errorHandlingMiddleware_1.errorHandler);
newserver.listen(config_1.config.server.port, () => console.log(`server connected @ ${config_1.config.server.port}`));
//# sourceMappingURL=server.js.map