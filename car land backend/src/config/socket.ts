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
  chatId?: string;
  socketId?: string;
};
interface ISentMessage {
  senderId: string;
  receiverId: string;
  text: string;
  socketId: string;
}
let users: Iuser[] = [];

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

    socket.on(
      "sendMessage",
      ({ senderId, receiverId, text, socketId }: ISentMessage) => {
        const user = getUser(receiverId);

        console.log(senderId, receiverId, text, socketId);

        try {
          io.to(user.socketId).emit("getmessage", {
            senderId,
            text,
            receiverId,
          });
        } catch (error) {
          console.log(error);
        }
      }
    );
  });
};
