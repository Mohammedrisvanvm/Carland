import { Server, Socket } from "socket.io";

interface userdataSocket extends Socket {
  message: string;
  senderId?: string | null;
  userName?: string | null;
  isUser: boolean;
  receiverId?: string;
}
type Iuser = {
  userId?: string;
  socketId?: string;
};

let users: Iuser[] = []

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (userId: string) => {
  users = users.filter((user) => user.userId !== userId);
};
const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};
export const socketConnect = (io: Server) => {
  io.on("connection", (socket: userdataSocket) => {

    console.log(socket.id,"");
    
    socket.on("addUser", (userId,socketId) => {
      console.log(userId,socketId, 1221);
      addUser(userId, socket.id);
      console.log(users,"x");
      io.emit("getUsers", users);
    });
    socket.on("removefromuser", (userId)=> {
      console.log(`disconnected,${userId}`);

      removeUser(userId);
      console.log(users);
      
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text ,socketId}) => {
      console.log(senderId, receiverId, text, "12345678");
      const user = getUser(receiverId);
console.log(user);
console.log(socketId);

      try {
        io.to(user.socketId).emit("getmessage", { senderId, text, receiverId });
      } catch (error) {
        console.log(error);
      }
    });
  });
};
