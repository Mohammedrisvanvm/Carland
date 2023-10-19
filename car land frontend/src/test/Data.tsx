import React, { ChangeEvent, FC } from "react";
import { useAppSelector } from "../redux/store/storeHook";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { Pagination } from "antd";
import { useNavigate } from "react-router";
import {
  Verifyhub,
  banHub,
  getAllHubs,
} from "../services/apis/adminApi/adminApi";
import { hub } from "../interfaces/userAuth";

type Iprop = {
  sidebarWidth: boolean;
};
const Data: FC<Iprop> = ({ sidebarWidth }) => {
  const [hubs, setHubs] = React.useState<hub[] | undefined>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<hub | undefined>(Object);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const Navigate = useNavigate();
  const id = useAppSelector((state) => state.vendor.hubId);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalpage, setTotalpage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await getAllHubs(search, currentPage);
        console.log(response);

        if (response.data?.hubs) setHubs(response.data?.hubs);
        if (response.data?.count) {
          setTotalpage(Math.ceil(response.data.count / 5));
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage]);
  const handleVerify = async (value: string | undefined) => {
    await Verifyhub(value);
    setShowModal(false);
    setLoading(!loading);
  };
  const banHandle = async (value: string) => {
    await banHub(value);
    setLoading(!loading);
  };
  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed w-6/6 transition-all duration-200 ease-in-out h-96`}
        style={{ height: "560px" }}
      >
        <div className="flex relative justify-between  py-5 ">
          {" "}
          <div className="w-10 h-5">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>filter</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 over">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                index
              </th>

              <th scope="col" className="px-6 py-3">
                hub Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>

              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                pincode
              </th>
              <th scope="col" className="px-6 py-3">
                Validity Date
              </th>
              <th scope="col" className="px-6 py-3">
                verified
              </th>
              <th scope="col" className="px-6 py-3">
                ban
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {hubs
              ? hubs.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">{index + 1}</td>

                    <td className="px-6 py-4">
                      {" "}
                      <img className="w-16 h-12" src={item.hubImage} />
                    </td>
                    <td className="px-6 py-4"> {item.hubName}</td>

                    <td className="px-6 py-4"> {item.placeName}</td>

                    <td className="px-6 py-4"> {item.pincode}</td>
                    <td className="px-6 py-4">
                      {new Date(item.validityDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <button className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                        <span
                          className={`${
                            item.isVerified ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {item.isVerified ? "verified" : "not verified"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => banHandle(item._id)}
                        className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40"
                      >
                        <span
                          className={`${
                            item.ban ? "text-red-600" : "text-green-600 "
                          }`}
                        >
                          {item.ban ? "banned" : "not banned"}
                        </span>
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                        onClick={() => {
                          setModalData(hubs[index]);

                          setShowModal(true);
                        }}
                      >
                        {" "}
                        action
                      </button>
                      <div>
                        {showModal ? (
                          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
                            <div className="w-3/6 h-4/6 flex flex-col">
                              <button
                                className="text-white text-xl place-self-end"
                                onClick={() => setShowModal(false)}
                              >
                                x
                              </button>
                              <div className="bg-white p-2 rounded">
                                <div className="p-6">
                                  <h3 className="text-xl flex justify-center font-semibold mb-5 text-gray-900">
                                    verification
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto sm:mx-28">
                                    <div className="bg-gray-500 h-42 w-56">
                                      <img
                                        src={modalData?.hubImage}
                                        alt="Hub Image"
                                      />
                                    </div>
                                    <div className="bg-blue-400 h-42 w-56">
                                      <img
                                        src={modalData?.license}
                                        alt="License"
                                      />
                                    </div>
                                    <div className="text-center font-semibold">
                                      hub image
                                    </div>
                                    <div className="text-center font-semibold">
                                      license
                                    </div>
                                  </div>

                                  <div className="flex flex-row justify-evenly">
                                    <button
                                      onClick={() => {
                                        setModalData(undefined);
                                        setShowModal(false);
                                      }}
                                      className="text-white mt-10 bg-red-700 hover:bg-red-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                                    >
                                      cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleVerify(modalData?._id)
                                      }
                                      className="text-white  mt-10 bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                                    >
                                      {modalData?.isVerified
                                        ? "remove verification"
                                        : "verify"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              : "not one"}
          </tbody>
        </table>
        <div className="text-center mt-10">
          <Pagination
            className="text-black"
            onChange={(page: number, pageSize: number) => setCurrentPage(page)}
            current={currentPage}
            total={totalpage * 10}
          />
        </div>
      </div>
    </>
  );
};

export default Data;
