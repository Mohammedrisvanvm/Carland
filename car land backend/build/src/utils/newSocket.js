"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnect = void 0;
const socket_io_1 = require("socket.io");
const credentials_1 = require("../middlewares/credentials");
const socketConnect = (server) => {
    const io = new socket_io_1.Server(server, {
        maxHttpBufferSize: 1e8,
        transports: ["websocket", "polling"],
        cors: {
            origin: credentials_1.allowedOrigins,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        socket.on("addUser", (chatId) => {
            socket.join(chatId);
        });
        socket.on("sendMessage", (data) => {
            socket.broadcast.to(data.conversationId).emit("getmessage", data);
        });
        socket.on("disconnect", () => {
            console.info("Disconnect received from" + socket.id);
        });
    });
    console.info("Socket Io Started.");
};
exports.socketConnect = socketConnect;
//# sourceMappingURL=newSocket.js.map