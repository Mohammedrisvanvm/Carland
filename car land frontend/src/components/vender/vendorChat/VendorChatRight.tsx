import React, { ChangeEvent, FC } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import io, { Socket } from "socket.io-client";
import { format } from "timeago.js";
import { IConversation } from "../../../interfaces/chatInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import {
  addNewMessage,
  getMessages,
} from "../../../services/apis/chatApi/chatApi";

type Iprops = {
  currentChat: IConversation | null;
};
const ENDPOINT: string = import.meta.env.VITE_BASEURL;

const VendorChatRight: FC<Iprops> = ({ currentChat }) => {
  const vendor = useAppSelector((state) => state.vendor);

  // @socketconnection

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
  const [messages, setMessages] = React.useState<DateMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [arrivalMessage, setArrivalMessage] =
    React.useState<DateMessage | null>(null);
  const scroll = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res: any = await getMessages(currentChat?._id);

      setMessages(res.data);
    };
    fetchData();
  }, []);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    const message: IMessage = {
      conversationId: currentChat?._id,
      messageText: newMessage,
      senderId: currentChat?.hubId,
      receiverId: currentChat?.userId,
    };

    socket.current?.emit("sendMessage", {
      conversationId: currentChat?._id,
      messageText: newMessage,
      senderId: currentChat?.hubId,
      receiverId: currentChat?.userId,
    });   
   
    try {
      const res: any = await addNewMessage(message);
      setMessages([...messages, res.data.savedMessage]);
      setNewMessage("");
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSelectEmoji = (emoji: any) => {
    setNewMessage(newMessage + emoji.native);
    setShowEmojiPicker(!showEmojiPicker);
  };

  React.useEffect(() => {
    if(currentChat){
      
    }
    socket.current?.emit("addUser", currentChat?._id);
  }, []);
  React.useEffect(() => {
    socket.current = io(ENDPOINT);
    
    socket.current?.on("getmessage", (data) => {
      setArrivalMessage({
        senderId:data.senderId,
        messageText: data.messageText,
        receiverId: data.receiverId,
        createdAt: new Date(Date.now()),
       
      });
    });
    return () => {
      socket.current?.emit("removefromuser", vendor.hubId);
    };
  }, []);
  React.useEffect(() => {
    arrivalMessage &&
      currentChat?.hubId &&
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  
  return (
    <div className=" text-black mt-2 w-full px-2 flex flex-col ">
      {" "}
      <div className="h-16 relative bg-gray-300 p-3  flex items-center">
        <div className=" rounded-lg">
          <img
            className="w-9 h-9 rounded-full "
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />

          <div className="absolute right-7 top-5">
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              className="hover:cursor-pointer"
              enable-background="new 0 0 24 24"
            >
              <path
                fill="gray"
                d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
              ></path>
            </svg>
          </div>
        </div>
        <div>
          {" "}
          <div className="flex-col flex pl-5">
            {" "}
            <span className="text-black font-base text-xl ">user name</span>
            <span className="text-green-400 font-base text-xs ">online </span>
          </div>
        </div>
      </div>
      <div className="bg-green-100 w-full h-full  overflow-y-scroll p-10">
        {" "}
        {messages
          ? messages.map((item) => (
              <div ref={scroll as React.RefObject<HTMLDivElement>}>
                <div
                  className={`flex  ${
                    item.senderId == vendor.hubId
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
                    item.senderId == vendor.hubId
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
      <div className="p-4 w-full bottom-0 bg-gray-200">
        <div className="flex items-center sm:space-x-2">
          <input
            type="text"
            className="flex-grow border rounded-full p-2"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-full"
            onClick={handleToggleEmojiPicker}
          >
            😄
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-full"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
        {showEmojiPicker && (
          <div className=" absolute bottom-24">
            <Picker data={data} onEmojiSelect={handleSelectEmoji} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorChatRight;
