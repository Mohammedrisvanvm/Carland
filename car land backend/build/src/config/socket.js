"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketConnect = void 0;
let users = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (userId) => {
    users = users.filter((user) => user.userId !== userId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
const socketConnect = (io) => {
    io.on("connection", (socket) => {
        socket.on("addUser", (userId, socketId) => {
            console.log(userId, "user", socketId, "socket");
            addUser(userId, socketId);
            io.emit("getUsers", users);
        });
        socket.on("removefromuser", (userId) => {
            console.log(userId);
            removeUser(userId);
            io.emit("getUsers", users);
        });
        socket.on("sendMessage", ({ senderId, receiverId, text, socketId }) => {
            const user = getUser(receiverId);
            console.log(senderId, receiverId, text, socketId);
            try {
                io.to(user.socketId).emit("getmessage", {
                    senderId,
                    text,
                    receiverId,
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    });
};
exports.socketConnect = socketConnect;
//# sourceMappingURL=socket.js.map