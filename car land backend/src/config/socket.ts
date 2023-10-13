import { NextFunction } from "express";
import { Server, Socket } from "socket.io";

interface userdataSocket extends Socket {
    message: string;
    userId?:string|null
    userName?:string|null
    isUser:boolean
  
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

   
  });
  io.on('new message',(socket:userdataSocket)=>{
    let i=socket.broadcast.emit("new message",{socket,
    userId:socket.userId,userName:socket.userName})
    console.log(i);
    
  })
};
