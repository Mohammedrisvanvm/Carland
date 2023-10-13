import { Socket } from "socket.io";

export const socketConnect = (io: {
  on: (arg0: string, arg1: (socket: Socket) => void) => void;
}) => {
    io.on('connection', (socket) => {
        console.log(socket.handshake.auth);
        console.log('a user connected');
      });
};
