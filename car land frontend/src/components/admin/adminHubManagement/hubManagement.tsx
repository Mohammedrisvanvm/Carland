import { ChangeEvent, useEffect, useState } from "react";
import { hub, user } from "../../../interfaces/userAuth";
import {
  Verifyhub,
  banHub,
  banUser,
  banVendor,
  getAllHubs,
  getAllUser,
  getAllVendors,
} from "../../../services/apis/adminApi/adminApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { getHub } from "../../../services/apis/vendorApi/vendorApi";
import HubModal from "./HubModal";

const HubManagement = () => {
  const [hubs, setHubs] = useState<hub[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState<hub | undefined>(Object);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await getAllHubs(search);
        console.log(response.data?.hubs);

        setHubs(response.data?.hubs);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [loading, search]);
  console.log(hubs);

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
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-14 m-8">
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white my-8 flex justify-center">
          Hub Details
        </span>
        <div className="flex items-center justify-between pb-4">
          <div>
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownRadio"
              className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="top"
            >
              <ul
                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-1"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last day
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      checked
                      id="filter-radio-example-2"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last 7 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-3"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last 30 days
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-4"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last month
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-5"
                      type="radio"
                      value=""
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Last year
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <label className="sr-only">Search</label>

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
              placeholder="Search for items"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>
        {/* <div className="flex justify-end relative right-10">
          <button
            onClick={() => {
              Navigate("/vendor/vendorcar/addcar");
            }}
            className="flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6 h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow-xl  shadow-black/20 dark:shadow-black/40"
          >
            <svg
              className="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="mx-2"> add Car</span>
          </button>
        </div> */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody>
            {hubs
              ? hubs.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">{index + 1}</td>
                    {/* <td className="px-6 py-4"> <img src={item.singleImage} alt=""/></td> */}

                    <td className="px-6 py-4">
                      {" "}
                      <img className="w-16 h-12" src={item.hubImage} />
                    </td>
                    <td className="px-6 py-4"> {item.hubName}</td>

                    <td className="px-6 py-4"> {item.location}</td>

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
                              {/* <div className="p-6">
  <h3 className="text-xl flex justify-center font-semibold mb-5 text-gray-900">
    verification
  </h3>
  <div className="flex flex-row mx-28 flex-wrap justify-between items-center">
    <div className="flex flex-col">
      <span className="font-medium">hub image</span>
      <div className="bg-gray-500 h-42 w-56">
        <img src={modalData?.hubImage} alt="Hub Image" />
      </div>
    </div>
    <div className="flex flex-col">
      <span className="font-medium">license</span>
      <div className="bg-blue-400 h-42 w-56">
        <img src={modalData?.license} alt="License" />
      </div>
    </div>
  </div> */}<div className="p-6">
  <h3 className="text-xl flex justify-center font-semibold mb-5 text-gray-900">
    verification
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto sm:mx-28">
    <div className="bg-gray-500 h-42 w-56">
      <img src={modalData?.hubImage} alt="Hub Image" />
    </div>
    <div className="bg-blue-400 h-42 w-56">
      <img src={modalData?.license} alt="License" />
    </div>
    <div className="text-center font-semibold">hub image</div>
    <div className="text-center font-semibold">license</div>
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
        <nav
          className="flex items-center justify-between pt-4 mx-4 mb-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default HubManagement;
