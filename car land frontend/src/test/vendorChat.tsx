import React, { ChangeEvent, FC } from "react";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import VendorNavBar from "../components/vender/vendorNavbar/vendorNavBar";
import io, { Socket } from "socket.io-client";
import { useAppSelector } from "../redux/store/storeHook";
import { format } from "timeago.js";
import {
  addNewMessage,
  getChatUser,
  getConversations,
  getMessages,
} from "../services/apis/chatApi/chatApi";
import { user } from "../interfaces/userAuth";
import { AxiosResponse } from "../interfaces/axiosinterface";
const ENDPOINT: string = "ws://localhost:3131/";

const VendorChat: FC = () => {
  const vendor = useAppSelector((state) => state.vendor);
  console.log(vendor);
  
  const scroll = React.useRef<HTMLElement | null>(null);
  const socket = React.useRef<Socket>();
  type IMessage = {
    conversationId?: string;
    messageText?: string;
    senderId?: string | null;
    receiverId?: string;
  };
  interface DateMessage extends IMessage {
    createdAt: Date;
    updatedAt?: Date;
    _id?: string;
  }
  type IConversation = {
    _id: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
  };

  const [currentChat, setCurrentChat] = React.useState<IConversation | null>(
    null
  );
  const [newMessage, setNewMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<DateMessage[]>([]);
  const [conversation, setConversation] = React.useState<
    IConversation[] | null
  >(null);
  const [arrivalMessage, setArrivalMessage] =
    React.useState<DateMessage | null>(null);
  const [user, setuser] = React.useState<user>();
  const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  React.useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current?.on("getmessage", (data) => {
      const senderId: string = data?.senderId || "";
      console.log(data);

      setArrivalMessage({
        senderId,
        messageText: data.text,
        receiverId: data.receiverId,
        createdAt: new Date(Date.now()),
      });
    });
  }, []);
  const handleSendMessage = async () => {
    const message: IMessage = {
      conversationId: currentChat?._id,
      messageText: newMessage,
      receiverId: user?._id,
      senderId: "651266a8c077d53eab4abe13",
    };
    console.log(message);
    socket.current?.emit("sendMessage", {
      senderId: "651266a8c077d53eab4abe13",
      receiverId: user?._id,
      socketId: socket.current.id,
      text: newMessage,
    });
    try {
      const res: any = await addNewMessage(message);
      console.log(res);
      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (error: any) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await getConversations(vendor.hubId);
        console.log(res);
        
        setConversation(res.data.conversation);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [vendor.id]);
  React.useEffect(() => {
    socket.current?.emit("addUser", "651266a8c077d53eab4abe13");
  }, [user]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res: any = await getMessages(currentChat?._id);

      setMessages(res.data);
    };
    fetchData();
  }, [currentChat]);
console.log(conversation);

  React.useEffect(() => {
    const client: string =
      (conversation &&
        conversation[0]?.members.find(
          (m) => m !== "651266a8c077d53eab4abe13"
        )) ||
      "";

    async function fetchData() {
      try {
        const { data }: AxiosResponse = await getChatUser(client);
        console.log(data);

        setuser(data?.user);
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchData();
  }, [conversation]);
  React.useEffect(() => {
    socket.current?.connect();
    socket.current?.on("connected", () => setSocketConnected(true));
  }, []);



  React.useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId as string) &&
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);



  return (
    <React.Fragment>
      <VendorNavBar sidebarWidth={false} spanVisible={false} setsidebarWidth={function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } setSpanVisible={function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } />
      <div className=" h-screen w-screen pt-20 text-white grid grid-cols-3 gap-4 px-10">
        <div className="">
          <input
            type="text"
            placeholder="search for users"
            className={`
                   block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          {conversation
            ? conversation.map((item) => (
                <>
                  <div
                    onClick={() => setCurrentChat(item)}
                    className="flex items-center p-3 hover:bg-gray-300 mt-3 w-96 rounded-lg"
                  >
                    <img
                      className="w-12 h-12 rounded-full mr-5"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                    <span className="text-black font-base text-xl">
                      {user?.userName}
                    </span>
                  </div>
                </>
              ))
            : ""}
        </div>
        <div className=" text-black mt-3 w-full col-span-2">
          <div className="overflow-y-scroll " style={{ height: "535px" }}>
            {messages
              ? messages.map((item) => (
                  <div ref={scroll as React.RefObject<HTMLDivElement>}>
                    <div
                      className={`flex  ${
                        item.senderId == "651266a8c077d53eab4abe13"
                          ? "justify-end"
                          : "justify-start"
                      }  `}
                    >
                      {" "}
                      <img
                        className="w-10 h-10 rounded-full mr-5"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                      <p className="p-2 bg-blue-400 rounded-lg max-w-xs">
                        {item.messageText}
                      </p>
                    </div>
                    {` `}
                    <div
                      className={`mt-3 flex  ${
                        item.senderId == "651266a8c077d53eab4abe13"
                          ? "justify-end px-2"
                          : "justify-start px-14"
                      }  text-gray-400 text-xs mb-4`}
                    >
                      {" "}
                      <p>{format(item.createdAt)}</p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          {/* <div className="flex fixed bottom-0 h-20 border-2 border-gray-200 rounded ">
            <span className="bg-white">
              <img
                src="/icons8-paperclip-48.png"
                className="pt-2 w-8 h-8 object-contaain flex items-center "
                alt=""
              />
            </span>
            <input
              type="text"
              // value={message}
              // onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //   setNewMessage(e.target.value)
              // }

              placeholder="text here"
              className=" w-96  border-l-2 border-gray-200 text-gray-500 focus:border-0 focus:border-gray-400"
            />
            <button
              type="submit"
              // onClick={handleSendMessage}
              className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-r px-5 py-2.5 text-center "
            >
              send
            </button>
          </div> */}
          <div className="flex items-center mt-1 justify-between ">
            <textarea
              placeholder="text-something"
              className="w-full p-3"
              value={newMessage}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setNewMessage(e.target.value)
              }
            ></textarea>
            <button
              type="submit"
              onClick={handleSendMessage}
              className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm  px-5 py-2.5 text-center mx-3"
            >
              send
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VendorChat;
