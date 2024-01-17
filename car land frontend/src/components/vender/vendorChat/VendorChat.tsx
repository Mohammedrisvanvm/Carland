import React, {  FC, ChangeEvent } from "react";
import { useAppSelector } from "../../../redux/store/storeHook";
import { IConversation } from "../../../interfaces/chatInterface";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { getConversations } from "../../../services/apis/chatApi/chatApi";
import VendorChatRight from "./VendorChatRight";



const VendorChat: FC = () => {
  const vendor = useAppSelector((state) => state.vendor);
  const [chatRight, setChatRight] = React.useState<boolean>(false);
  const [currentChat, setCurrentChat] = React.useState<IConversation | null>(
    null
  );

  const [conversation, setConversation] = React.useState<
    IConversation[] | undefined
  >();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res =  (await getConversations(vendor.hubId)).data?.allConversation 
       console.log(res);

        setConversation(res);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [vendor.id]);

  return (
    <>
      <div className="h-screen w-screen p-5 border-4 border-black text-white flex">
        <div className="w-96 max-h-full border-r-2 p-2">
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
          </div>
          <div className="relative w-full my-2 flex items-center px-2 ">
            <div className="absolute inset-y-0  flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="mr-3 flex justify-between ">
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // setSearch(e.target.value)
              
                }}
              />
            </div>
            <div className="absolute right-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 576 512"
                className="hover:cursor-pointer"
              >
                <path
                  fill="gray"
                  d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                />
              </svg>
            </div>
          </div>

          <hr />

          <div className="h-5/6 w-96 overflow-y-scroll">
            {conversation
              ? conversation.map((item) => (
                  <>
                    <div
                      onClick={() => {
                        setCurrentChat(item);
                        setChatRight(true);
                      }}
                      className="flex items-center p-2 hover:bg-gray-300  w-80 rounded-lg"
                    >
                      <img
                        className="w-12 h-12 rounded-full mr-5"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                      <span className="text-black font-base text-xl">
                        {item.userName}
                      </span>
                    </div>
                    <div className="pr-4">
                      {" "}
                      <hr />
                    </div>
                  </>
                ))
              : ""}
          </div>
        </div>

        {/* right side of the chat screen */}
        {chatRight ? <VendorChatRight currentChat={currentChat} /> : ""}
      </div>
    </>
  );
};

export default VendorChat;
