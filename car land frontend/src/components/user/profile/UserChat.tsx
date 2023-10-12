import React, { Dispatch, SetStateAction, FC } from "react";
import { Socket } from "socket.io";

type Iprop = {
  setShowChat: Dispatch<SetStateAction<boolean>>;
};
const UserChat: FC<Iprop> = ({ setShowChat }) => {
  return (
    <React.Fragment>
      <div className="h-screen">
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center bg-black ">
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
                  <div className="bg-blue-400 h-42 w-56"></div>
                </div>
                <div className="h-96 px-5 pt-5 bg-gray-300 flex justify-between ">
                    <div className="bg-gray-400 h-8 py-1 px-3 rounded">
                    vd df   
                    </div>
                    <div>
                    vd df
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
                    placeholder="text here"
                    className=" w-full border-l-2 border-gray-200 text-gray-500 focus:border-0 focus:border-gray-400"
                  />
                  <button  type="submit"   className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-r px-5 py-2.5 text-center ">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserChat;
