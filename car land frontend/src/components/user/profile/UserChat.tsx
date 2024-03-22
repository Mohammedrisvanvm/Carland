import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

import io, { Socket } from "socket.io-client";
import { format } from "timeago.js";
import { useAppSelector } from "../../../redux/store/storeHook";
import {
  addNewMessage,
  createConversation,
  getMessages
} from "../../../services/apis/chatApi/chatApi";
const ENDPOINT: string = import.meta.env.VITE_BASEURL;
type Iprop = {
  setShowChat: Dispatch<SetStateAction<boolean>>;
  bookingId: string;
  hubId: string;
};
const UserChat: FC<Iprop> = ({ setShowChat, hubId }) => {
  const socket = React.useRef<Socket>();
  const scroll = React.useRef<HTMLElement | null>(null);
  const user = useAppSelector((state) => state.user);
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
  interface Iconversation {
    _id: string;
    hubId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  const [currentChat, setCurrentChat] = React.useState<Iconversation>();
  const [messages, setMessages] = React.useState<DateMessage[]>([]);
  const [arrivalMessage, setArrivalMessage] = React.useState<DateMessage>();
  const [NewMessage, setNewMessage] = React.useState<string>("");

  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await createConversation(hubId, user._id)).data
          ?.conversation;
        setCurrentChat(response);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    const fetchData = async () => {
      const res: any = await getMessages(currentChat?._id);

      setMessages(res.data);
    };
    fetchData();
  }, [currentChat]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    const message: IMessage = {
      conversationId: currentChat?._id,
      messageText: NewMessage,
      senderId: user?._id,
      receiverId: currentChat?.hubId,
    };

    socket.current?.emit("sendMessage", {
      conversationId: currentChat?._id,
      messageText: NewMessage,
      senderId: user?._id,
      receiverId: currentChat?.hubId,
    });

    try {
      const res: any = await addNewMessage(message);

      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (error: any) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current?.on("getmessage", (data) => {

      setArrivalMessage({
        senderId: data.senderId,
        messageText: data.messageText,
        receiverId: data.receiverId,
        createdAt: new Date(Date.now()),
      });
    });
  }, []);
React.useEffect(() => {
  
    socket.current?.emit("addUser", currentChat?._id);
  }, [currentChat]);

  React.useEffect(() => {
    arrivalMessage &&
      currentChat?.hubId &&
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  return (
    <React.Fragment>
      <div className="h-screen">
        <div className="fixed h-full inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center bg-black ">
          <div className="w-full h-full px-4 flex flex-col">
            <button
              className="text-white text-xl place-self-end"
              onClick={() => setShowChat(false)}
            >
              x
            </button>
            <div className="bg-white p-2 rounded">
              <div className="p-6">
                <h3 className="text-xl flex justify-center font-semibold mb-5 text-gray-900">
                  welcome to chat
                </h3>
                <div className="flex justify-center">
                  <div className="bg-gray-400 h-12 flex justify-between items-center w-full pl-4 pr-10">
                    <div className="rounded-3xl h-10 w-10 bg-black ">
                      <img
                        className="object-cover rounded-3xl w-full h-full"
                        src="https://images.pexels.com/photos/3931603/pexels-photo-3931603.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                        alt=""
                      />
                    </div>
                    <div className="">Risvan</div>
                  </div>
                </div>
                <div className="h-96 w-auto px-5 pt-5 bg-gray-300  overflow-y-auto ">
                  {messages
                    ? messages.map((item) => (
                        <div
                          key={item._id}
                          ref={scroll as React.RefObject<HTMLDivElement>}
                        >
                          <div
                            className={`flex  ${
                              item.senderId == user._id
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
                              item.senderId == user._id
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
              </div>
              <div className="flex flex-row justify-evenly h-10 border-2 border-gray-200 rounded">
                <span>
                  <img
                    src="/icons8-paperclip-48.png"
                    className=" pt-2 w-8 "
                    alt=""
                  />
                </span>
                <input
                  type="text"
                  value={NewMessage}
                  onChange={handleInputChange}
                  placeholder="text here"
                  className=" w-full border-l-2 border-gray-200 text-gray-500 focus:border-0 focus:border-gray-400"
                />
                <button
                  type="submit"
                  onClick={handleSendMessage}
                  className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-r px-5 py-2.5 text-center "
                >
                  send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserChat;
