import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
interface ISentMessage {
  conversationId: string;
  messageText: string;
  senderId: string;
  receiverId: string;
}
export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  // master list of all connected
  public users: { [uid: string]: string };
  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = { uuid: "23", uud: "23" };
    this.io = new Server(server, {
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
  StartListeners = (socket: Socket) => {
    console.info("message received from " + socket.id);
    socket.on("handshake", () => {
      console.info("Hand shake received from " + socket.id);
    });
    socket.on("addUser", (chatId) => {
      console.log(chatId+"erftyguhij");

      socket.join(chatId);
    });
    socket.on("sendMessage", (data: ISentMessage) => {
      console.log(data);
      socket.broadcast.to(data.conversationId).emit("getmessage", data);
    });
    socket.on("disconnect", () => {
      console.info("Disconnect received from" + socket.id);
    });
  };
}
