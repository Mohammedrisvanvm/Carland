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
console.log(socket.handshake.auth);
socket.on("message",(data)=>{
console.log(data,"123456");
socket.broadcast.emit("receive",data)

})
    if (!id) {
      socket.emit("error", "Invalid userData");
      return;
    }

    socket.userName = userName;
    socket.userId = id;

   
  });
  // io.on('message',(socket:userdataSocket)=>{
  io.on('message',(socket:any)=>{
    console.log(socket,2222);
    
    // let i=socket.broadcast.emit("new message",{socket,
    // userId:socket.userId,userName:socket.userName})
    // console.log(i);
    
  })
};
