import express, { Request, Response } from "express";
import { DBconnect } from "./config/mongoDB";
import cors from "cors";
import { config } from "./config/config";
import userRouters from "./routers/userRouters";
import vendorRouters from "./routers/VendorRouters";
import adminRouters from "./routers/adminRouters";
import chatRouter from "./routers/chatRouters";
import {
  errorHandler,
  notFound,
} from "./middlewares/errorHandler/errorHandlingMiddleware";
import cookieParser from "cookie-parser";
import path from 'path'
import http from 'http'

import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./interfaces/socketIinterface";
import { socketConnect } from "./config/socket";
import { Server  } from "socket.io";


const app = express();
//socket.io server
const newserver=http.createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(newserver,{
  cors: {
      origin: ["http://localhost:3000","https://carland-five.vercel.app"],
      credentials: true,
  },
});


socketConnect(io)

DBconnect();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(express.static(path.resolve() + "/public"));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000",'https://carland-five.vercel.app'],
    credentials: true,
  })
);

app.use("/users", userRouters);
app.use("/vendors", vendorRouters);
app.use("/admin", adminRouters);
app.use("/chat", chatRouter);
app.get("/", (req: Request, res: Response): void => {
  res.send("hai");
});

app.use(notFound);
app.use(errorHandler);

newserver.listen(config.server.port, () => console.log("server connected @3131"));
