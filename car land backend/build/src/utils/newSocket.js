"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSocket = void 0;
const socket_io_1 = require("socket.io");
class ServerSocket {
    constructor(server) {
        this.StartListeners = (socket) => {
            console.info("message received from " + socket.id);
            socket.on("handshake", () => {
                console.info("Hand shake received from " + socket.id);
            });
            socket.on("addUser", (chatId) => {
                console.log(chatId + "erftyguhij");
                socket.join(chatId);
            });
            socket.on("sendMessage", (data) => {
                console.log(data);
                socket.broadcast.to(data.conversationId).emit("getmessage", data);
            });
            socket.on("disconnect", () => {
                console.info("Disconnect received from" + socket.id);
            });
        };
        ServerSocket.instance = this;
        this.users = { uuid: "23", uud: "23" };
        this.io = new socket_io_1.Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 0,
            cookie: false,
            cors: {
                origin: "*",
            },
        });
        this.io.on("connect", this.StartListeners);
        console.log(Object.entries(this.users));
        console.info("Socket Io Started.");
    }
}
exports.ServerSocket = ServerSocket;
//# sourceMappingURL=newSocket.js.map