import { useNavigate } from "react-router";

import { useLocation } from "react-router-dom";

import React, { Fragment, ChangeEvent, useEffect } from "react";

import { RangePickerProps } from "antd/es/date-picker";

import dayjs from "dayjs";
import { DatePicker, Pagination } from "antd";
import { Vehicles } from "../../interfaces/vehicleInterface";
import mapboxAPI from "../../services/mapbox/mapbox";
import { AxiosResponse } from "../../interfaces/axiosinterface";
import { userGetVehicle } from "../../services/apis/userApi/userApi";
import Loader from "../../utils/Loader";
import { MainHeader } from "../userHeader/MainHeader/MainHeader";
import { GeocodingResponse } from "../../interfaces/geocodingInterface";

interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}
type Current = {
  latitude: number;
  longitude: number;
};
interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const Content = () => {
  const [vehicles, setVehicles] = React.useState<Vehicles[] | undefined>([]);
  const Navigate = useNavigate();
  let location = useLocation();
  const [search, setSearch] = React.useState<string>("");
  const [filter, setFilter] = React.useState<string>("");
  const [loader, setLoader] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalpage, setTotalpage] = React.useState<number>(1);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [seletedDate, setSeletedDate] = React.useState<string[]>([]);
  const [suggestion, setSuggestion] = React.useState<any[]>([]);
  const [seletedDateTemp, setSeletedDateTemp] = React.useState<string[]>([]);
  const [latitude, setLatitude] = React.useState<number | null>(null);
  const [longitude, setLongitude] = React.useState<number | null>(null);
  const [currentLocation, setCurrentLocation] = React.useState<Current | null>(
    null
  );
  const pageSize = 4;
  const { RangePicker } = DatePicker;

  function handleDate(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("got");

    setSeletedDate(seletedDateTemp);
  }
  function onChange(value: any, dateString: [string, string]) {
    if (value[0] && value[1]) {
      // Handle date range change here
      console.log("Selected Time: ", typeof value[0].$d, value[1].$d);
      console.log("Formatted Selected Time: ", typeof dateString, dateString);
    }
    // console.log("Selected Time: ", typeof(value[0].$d), value[0].$d);
    console.log("Formatted Selected Time: ", typeof dateString, dateString);
    setSeletedDate(dateString);
  }

  function onOk(value: any) {
    console.log("onOk: ", typeof value, value);
  }
  const handlesearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await mapboxAPI.get(
      `/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`
    );

    console.log(response);

    if (response.data.features.length === 0) {
      console.log("Location not found");
      return;
    }
    console.log(response);
    const points = response.data.features[1];
    console.log(parseFloat(points.center[1]));
    const latitude: number = parseFloat(points.center[1]);
    const longitude: number = parseFloat(points.center[0]);
    setLatitude(latitude);
    setLongitude(longitude);
    const searchedLocation: {
      latitude: number;
      longitude: number;
    } = { latitude: latitude, longitude: longitude };
    console.log(searchedLocation, "searched Location");
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const response: GeocodingResponse = await mapboxAPI.get(
        `/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`
      );
      setSuggestion(response.data.features);
    };
    fetchLocation();
  }, [searchQuery]);
  // console.log(location);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userGetVehicle(
          currentPage,
          search,
          filter,
          latitude,
          longitude,
          seletedDate
        );
        console.log(response);

        setVehicles(response.data?.vehicles);
        if (response.data?.count) {
          setTotalpage(Math.ceil(response.data.count / 4));
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [currentPage, search, filter, action]);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  async function CurrentLocation(coords: Current) {
    const res: GeocodingResponse = await mapboxAPI.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json`
    );
    setSearchQuery(res.data.features[0].place_name);
  }
  console.log(currentLocation?.latitude);

  console.log(latitude, longitude);

  return (
    <Fragment>
      {loader ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MainHeader />
          <div className="relative" style={{ height: "450px" }}>
            <div className="w-full h-96  p-5">
              <div className="bg-white h-full w-full p-10  flex justify-center bg-[url('/download.jpg')] bg-contain">
                <div className="absolute  bottom-0 shadow rounded-xl border-zinc-400 h-56  sm:h-56 sm:w-2/3 w-4/5 bg-white  sm:px-0 px-2 sm:grid sm:grid-cols-3">
                  {" "}
                  <div className="border-4 sm:col-span-1 sm:rounded-l-lg flex justify-center items-center text-black px-4 capitalize font-semibold sm:text-5xl">
                    <p className="">search your best car here</p>{" "}
                  </div>
                  <div className="sm:col-span-2 grid  grid-rows-2  items-center rounded-r-lg">
                    <form onSubmit={handlesearch}>
                      <div className="grid grid-cols-8 mb-5 p-2 ">
                        <input
                          type="text"
                          placeholder="Search using Location"
                          value={searchQuery}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setSearchQuery(event.target.value);
                          }}
                          className="h-12 px-4 col-span-7 rounded-md focus:border-gray-300 focus:ring focus:ring-gray-300 w-full pr-10"
                        />

                        <div className="z-50 absolute gap-3  text-gray-600 grid grid-rows-1 p-1">
                          {latitude
                            ? ""
                            : suggestion.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => {
                                    setSuggestion([]);
                                    setLongitude(item.center[0]);
                                    setLatitude(item.center[1]);
                                    setSearchQuery(item.place_name);
                                  }}
                                  className="hover:bg-gray-200 bg-white p-2 border"
                                >
                                  {item.place_name}
                                </div>
                              ))}
                        </div>

                        <div className="flex justify-center items-center">
                          <svg
                            onClick={() => {
                              if (!latitude) {
                                navigator.geolocation.getCurrentPosition(
                                  (position: GeolocationPosition) => {
                                    CurrentLocation(position.coords);
                                  }
                                );
                              } else {
                                setLatitude(null);
                                setLongitude(null);
                              }
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 hover:cursor-pointer"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="navyblue"
                              d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="justify-center flex bg-black">
                        <RangePicker
                          size="middle"
                          className="h-12"
                          format="YYYY-MM-DD"
                          placeholder={["Start Time", "End Time"]}
                          onChange={onChange}
                          disabledDate={disabledDate}
                        />
                      </div>
                    </form>

                    <div className="flex items-center  justify-center mb-5">
                      <button
                        onClick={() => setAction(!action)}
                        className="h-12 w-full mx-2 border bg-black  rounded-md hover:bg-gray-500 text-white "
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 mt-6 sm:my-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl  md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              {/* <div className="sm:flex justify-around">
                {" "}
                <div></div>
                <RangePicker
                  showTime={{ format: "h a" }}
                  format="YYYY-MM-DD h a"
                  placeholder={["Start Time", "End Time"]}
                  onChange={onChange}
                  disabledDate={disabledDate}
                />
                <button
                  type="submit"
                  className=" items-center text-sm justify-center sm:w-full w-28 rounded-lg h-12  font-medium tracking-wide text-white transition duration-200 sm:rounded-r-lg shadow-md bg-black focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  get cars
                </button>
              </div> */}
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

                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
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
              {vehicles ? (
                vehicles.map((item) => (
                  <button
                    aria-label="View Item"
                    onClick={() => {
                      Navigate(`/singlecar?carId=${item._id}`);
                    }}
                    className="inline-block overflow-hidden duration-300 transform bg-white rounded shadow-sm hover:-translate-y-2"
                  >
                    <div className="flex flex-col h-full" key={item._id}>
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
              ) : (
                <>
                  <div className="text-lg font-bold text-red-600">
                    "no cars available in this area {searchQuery}"
                  </div>
                </>
              )}
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
