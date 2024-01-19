import express, { Request, Response } from "express";
import { DBconnect } from "./config/mongoDB";
import cors from "cors";
import { config } from "./config/config";
import userRouters from "./routers/userRouters";
import vendorRouters from "./routers/VendorRouters";
import adminRouters from "./routers/adminRouters";
import chatRouter from "./routers/chatRouters";

import cookieParser from "cookie-parser";
import path from "path";
import http from "http";

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "./interfaces/socketIinterface";
import { socketConnect } from "./config/socket";
import { Server } from "socket.io";
import {
  errorHandler,
  notFound,
} from "./middlewares/errorHandler/errorHandlingMiddleware";
import { ServerSocket } from "./utils/newSocket";
import credentials, { allowedOrigins } from "./middlewares/credentials";
import Razorpay from "razorpay";

export const app = express();
//socket.io server
const newserver = http.createServer(app);
// const io = new Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >(newserver, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "https://carland-five.vercel.app",
//       "https://carlandpro.netlify.app",
//       "ws://carland.eshopsport.store",
//     ],
//     credentials: true,
//   },
// });

// socketConnect(io);

new ServerSocket(newserver)
DBconnect();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static(path.resolve() + "/public"));
app.use(cookieParser());
app.use(credentials)
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus:200
  })
);

app.use("/users", userRouters);
app.use("/vendors", vendorRouters);
app.use("/admin", adminRouters);
app.use("/chat", chatRouter);
app.get("/", (req: Request, res: Response): void => {
  res.send("health checked");
});

app.use(notFound);
app.use(errorHandler);


newserver.listen(config.server.port, () =>
  console.log(`server connected @ ${config.server.port}`)
);
