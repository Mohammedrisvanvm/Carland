import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { allowedOrigins } from "../middlewares/credentials";
interface ISentMessage {
  conversationId: string;
  messageText: string;
  senderId: string;
  receiverId: string;
}

export const socketConnect = (server: HTTPServer) => {
  const io = new Server(server, {
    maxHttpBufferSize: 1e8,
    transports: ["websocket", "polling"],
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("addUser", (chatId) => {
      socket.join(chatId);
    });
    socket.on("sendMessage", (data: ISentMessage) => {
      socket.broadcast.to(data.conversationId).emit("getmessage", data);
    });
    socket.on("disconnect", () => {
      console.info("Disconnect received from" + socket.id);
    });
  });

  console.info("Socket Io Started.");
};
