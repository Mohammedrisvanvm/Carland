import { useNavigate } from "react-router";
import { userGetVehicle } from "../../services/apis/userApi/userApi";
import { Vehicles } from "../../interfaces/vehicleInterface";
import { useLocation } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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
import { DatePicker, Pagination } from "antd";

import mapboxAPI from "../../services/mapbox/mapbox";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const Content = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | undefined>([]);
  const Navigate = useNavigate();
  let location = useLocation();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalpage, setTotalpage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedLatitude, setSearchedLatitude] = useState<number>();
  const [searchedLongitude, setSearchedLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const pageSize = 4;
  const { RangePicker } = DatePicker;

  function onChange(value: any, dateString: any) {
    console.log("Selected Time: ", typeof value, value);
    console.log("Formatted Selected Time: ", typeof dateString, dateString);
  }

  function onOk(value: any) {
    console.log("onOk: ", typeof value, value);
  }
  console.log(location);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userGetVehicle(
          currentPage,
          search,
          filter,
          latitude,
          longitude
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
  }, [currentPage, search, filter,latitude,
    longitude]);
  console.log(searchedLatitude, searchedLongitude);

  //  const locationSearch=async()=>{
  //     const response:any = await mapboxAPI.get(`/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`);
  //       if (response.data.features.length === 0) {
  //         console.log('Location not found');
  //         return;
  //       }

  //       const points:any = response.data.features[1];
  //       console.log(points);
  //       const latitude:number = parseFloat(points.center[1]);
  //       const longitude:number = parseFloat(points.center[0]);
  //       setSearchedLatitude(latitude);
  //       setSearchedLongitude(longitude);
  //       const searchedLocation : {
  //         latitude: number | undefined;
  //         longitude: number | undefined;
  //     }= { latitude: searchedLatitude, longitude: searchedLongitude };
  //   }
  const [isOpen, setIsOpen] = useState(true);
  
  //   const within10Km = distance <= 10;
  //   console.log(within10Km, 'within 10 km');
  //   return within10Km;
  // }
  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MainHeader />
          <div className="px-4 mt-6 sm:my-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl  md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h2 className="max-w-lg mb-10 font-sans inline-block font-bold leading-none text-center tracking-tight text-gray-900 text-sm sm:text-4xl md:mx-auto">
                Rent a car and explore the city at your own pace
              </h2>

              <div
            onClick={() =>
              navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                // getlocation();
                console.log(position.coords);
              })
            }
          >
            hello
          </div>

              <div className="flex items-center justify-center mb-5">
                <input
                  type="text"
                  placeholder="Search using Location"
                  // value={searchQuery}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(event.target.value);
                  }}
                  className="h-12 px-4 border  border-black rounded-md focus:border-gray-300 focus:ring focus:ring-gray-300 focus: w-96"
                />
                <button
                  // onClick={locationSearch}

                  className="h-12 px-4 mx-2 border border-gray-300 rounded-md focus:ring focus:ring-gray-300 focus:outline-none"
                >
                  Search
                </button>
              </div>
              <div className="sm:flex justify-center">
                {" "}
                <RangePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={["Start Time", "End Time"]}
                  onChange={onChange}
                  onOk={onOk}
                />
                <button
                  className="inline-flex items-center text-sm justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-r-lg shadow-md bg-black focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Get Cars
                </button>
              </div>
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
                    <option value="" selected>
                    All
                    </option>
                   
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
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
                  className="p-2.5 ml-2 text-sm font-medium text-white bg-black rounded-lg border border-gray-700 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      onClick={() => {
                        Navigate(`/singlecar?carId=${item._id}`);
                      }}
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
