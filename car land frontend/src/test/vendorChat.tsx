import React, { FC } from "react";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import VendorNavBar from "../components/vender/vendorNavbar/vendorNavBar";

const VendorChat: FC = () => {
  return (
    <React.Fragment>
      <VendorNavBar />
      <div className=" h-screen w-screen pt-20 text-white grid grid-cols-3 gap-4 px-10">
        <div className="">
          <input
            type="text"
            placeholder="search for users"
            className={`
                   block py-2.5 px-0 w-96 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />

          <div className="flex items-center p-3 hover:bg-gray-300 mt-3 w-96 rounded-lg">
            <img
              className="w-12 h-12 rounded-full mr-5"
              src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo"
            />
            <span className="text-black font-base text-xl">risvan</span>
          </div>
        </div>
        <div className=" text-black mt-3 w-full col-span-2">
          <div className="overflow-y-scroll " style={{ height: "535px" }}>
            <div className="flex justify-start ">
              {" "}
              <img
                className="w-10 h-10 rounded-full mr-5"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <p className="p-2 bg-blue-400 rounded-lg max-w-xs">
                tLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum
              </p>
            </div>
            <div className="mt-1 flex justify-end text-gray-400 max-w-sm text-xs mb-4">
              {" "}
              <p>1 hour ago</p>
            </div>
            <div className="flex justify-start ">
              {" "}
              <img
                className="w-10 h-10 rounded-full mr-5"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <p className="p-2 bg-blue-400 rounded-lg max-w-xs">
                tLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum
              </p>
            </div>
            <div className="mt-1 flex justify-end text-gray-400 max-w-sm text-xs">
              {" "}
              <p>1 hour ago</p>
            </div>
            <div className="flex justify-start ">
              {" "}
              <img
                className="w-10 h-10 rounded-full mr-5"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
              <p className="p-2 bg-blue-400 rounded-lg max-w-xs">
                tLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum
              </p>
            </div>
            <div className="mt-1 flex justify-end text-gray-400 max-w-sm text-xs">
              {" "}
              <p>1 hour ago</p>
            </div>
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
            ></textarea>
            <button
              type="submit"
              // onClick={handleSendMessage}
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
