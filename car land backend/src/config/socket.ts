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

let users: Iuser[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};
export const socketConnect = (io: Server) => {
  io.on("connection", (socket: userdataSocket) => {
    socket.on("addUser", (userId) => {
      console.log(userId, 1221);
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
    socket.on("disconnect", () => {
      console.log("disconnected");

      removeUser(socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text, socketId }) => {
      console.log(senderId, receiverId, socketId, text, "12345678");
      const user = getUser(receiverId);

      try {
        io.to(user.socketId).emit("getmessage", { senderId, text, receiverId });
      } catch (error) {
        console.log(error);
      }
    });
  });
};
