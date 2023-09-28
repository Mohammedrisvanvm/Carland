import { useNavigate } from "react-router";
import { userGetVehicle } from "../../services/apis/userApi/userApi";
import { Vehicles } from "../../interfaces/vehicleInterface";
import {
  useEffect,
  useState,
  Fragment,
  ChangeEvent,
  MouseEventHandler,
  MouseEvent,
} from "react";
import { AxiosResponse } from "../../interfaces/axiosinterface";
import { MainHeader } from "../userHeader/MainHeader/MainHeader";
import Loader from "../../utils/Loader";
import { Pagination } from "antd";

export const Content = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | undefined>([]);
  const Navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalpage, setTotalpage] = useState<number>(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userGetVehicle(
          currentPage,
          search,
          filter
        );

        setVehicles(response.data?.vehicles);
        if (response.data?.count) {
          console.log(Math.ceil(response.data.count / 4));

          setTotalpage(Math.ceil(response.data.count / 4));
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [currentPage, search,filter]);
  console.log(currentPage, totalpage);

  const [isOpen, setIsOpen] = useState(true);

  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MainHeader />
          <div className="px-4 mt-10 sm:my-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div className="flex justify-center">
                {" "}
                <button
                  className="inline-flex items-center justify-between border-r-2 border-gray-300 text-sm w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200  rounded-l-lg shadow-md bg-stone-100 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Place
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/lineo-mobile/100/gps-256.png"
                    alt=""
                    style={{ width: "30px", height: "30px" }}
                  />
                </button>
                <button
                  className="inline-flex items-center text-sm justify-between border-r-2 border-gray-300 w-full h-12 px-6 font-medium tracking-wide text-black transition duration-200 shadow-md bg-stone-100	 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Time
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
                  </svg>
                </button>
                <button
                  className="inline-flex items-center text-sm justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-r-lg shadow-md bg-black focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Get Cars
                </button>
              </div>

              <h2 className="max-w-lg m-12 sm:m-16 font-sans inline-block font-bold leading-none text-center tracking-tight text-gray-900 text-sm sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <span className="relative">The</span>
                </span>{" "}
                Rent a car and explore the city at your own pace
              </h2>
            </div>

            <div className="flex justify-between my-10 ">
              <div className="flex">
                <form className="flex">
                  <select
                    id="countries"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setFilter(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option value='' selected>Filter</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Clear">Clear</option>
                  </select>
                </form>
              </div>

              <form className="flex justify-between">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Car Name..."
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                />

                <button
                  type="submit"
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </form>
            </div>
            <div className="grid gap-5 row-gap-5 mb-8 lg:grid-cols-4 sm:grid-cols-2">
              {vehicles
                ? vehicles.map((item) => (
                    <button
                      aria-label="View Item"
                      className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
                    >
                      <div className="flex flex-col h-full">
                        <img
                          src={item.singleImage}
                          className="object-cover w-full h-48"
                          alt=""
                        />
                        <div className="flex-grow border border-t-0 rounded-b">
                          <div className="p-5">
                            <h6 className="mb-2 font-bold text-xl ">
                              {item.vehicleName} {item.year}
                            </h6>
                            <p className="text-xs flex justify-center text-gray-600 font-medium items-center gap-[5px]  ">
                              <span> {item.colour}</span>
                              <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />

                              <span> {item.fuel}</span>
                              <div className="relative w-[3px] h-[3px] bg-[#a8a8a8] rounded-[1.5px]" />

                              <span> {item.numofseats}</span>
                            </p>
                          </div>
                          <hr />
                          <div className="flex justify-around my-4">
                            <p className="text-xs text-gray-600 font-serif font-medium">
                              available at feb 32
                              <br />
                              <span className="text-xl text-black font-semibold font-sans">
                                {" "}
                                ₹ {item.fairPrice} /day
                              </span>
                            </p>
                            <button className="text-gray-800 bg-stone-200 hover:bg-black hover:text-white focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center ">
                              view
                            </button>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                : "hai"}
            </div>
            <div className="text-center">
              <Pagination
                className="text-black"
                onChange={(page: number, pageSize: number) =>
                  setCurrentPage(page)
                }
                current={currentPage}
                total={totalpage * 10}
              />
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
