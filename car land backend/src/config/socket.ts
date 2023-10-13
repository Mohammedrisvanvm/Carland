import { NextFunction } from "express";
import { Server, Socket } from "socket.io";

interface userdataSocket extends Socket {
  userName: string;
  userId: string;
}
export const socketConnect = (io: Server) => {
  io.on("connection", (socket: userdataSocket) => {
    type Iauth = {
      userName?: string;
      id?: string;
    };
    const { userName, id }: Iauth = socket.handshake.auth;

    if (!id) {
      socket.emit("error", "Invalid userData");
      return;
    }

    socket.userName = userName;
    socket.userId = id;

    console.log("a user connected",socket);
  });
};
