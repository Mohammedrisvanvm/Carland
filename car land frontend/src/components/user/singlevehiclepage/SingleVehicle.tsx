import React, { FC, ChangeEvent, useEffect } from "react";
import { DatePicker } from "antd";

import { Dialog, Transition } from "@headlessui/react";
import { EyeIcon } from "@heroicons/react/24/outline";

import dayjs from "dayjs";

import { toast } from "react-toastify";
import { Vehicles } from "../../../interfaces/vehicleInterface";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { userSingleGetVehicle } from "../../../services/apis/userApi/userApi";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";
import Payment from "../payment/Payment";
import StaticMapRoute from "../profile/StaticMapRoute";
import mapboxAPI from "../../../services/mapbox/mapbox";
import { GeocodingResponse } from "../../../interfaces/geocodingInterface";
import { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { UserFooter } from "../../userFooter/userFooter";
let images: string[] = [];

const SingleCar: FC = () => {
  const [vehicle, setVehicle] = React.useState<Vehicles | null>(null);
  const [activeSlide, setActiveSlide] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [map, setMap] = React.useState<boolean>(false);
  const [place, setPlace] = React.useState<string>("");
  const [seletedDate, setSeletedDate] = React.useState<string | null>(null);
  const Navigate = useNavigate();
  const location = useLocation();
  const [paybutton, setPaybutton] = React.useState<boolean>(false);
  const [oldbookingDates, setOldbookingDates] = React.useState<Date[]>([]);

  type ILocation = {
    latitude: number;
    longitude: number;
  };

  const [Location, setLocation] = React.useState<ILocation | null>(null);
  const queryParams = new URLSearchParams(location.search);
  const carId: string | null = queryParams.get("carId");
  const user = useAppSelector((state) => state.user);
  const cancelButtonRef = React.useRef(null);
  const nextSlide = () => {
    setActiveSlide((activeSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveSlide((activeSlide - 1 + images.length) % images.length);
  };
  interface DayjsObject {
    $D: number;
    $H: number;
    $L: string;
    $M: number;
    $W: number;
    $d: string;
    $m: number;
    $s: number;
    $y: number;
  }
  function onChange(value: any, dateString: [string, string]) {
    const date1 = value[0] as DayjsObject;
    const date2 = value[1] as DayjsObject;
    if (value[0] && value[1]) {
      const selectedDate = `${date1.$d}, ${date2.$d}`;

      setSeletedDate(selectedDate);
    }
  }

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userSingleGetVehicle(carId);

        if (response.data?.vehicle && response.data?.location) {
          setVehicle(response.data?.vehicle);
          images.push(response.data.vehicle?.singleImage);
          response.data.vehicle?.SubImages.forEach((image) => {
            images.push(image);
          });
          if (response.data?.datesArray) {
            setOldbookingDates(response.data?.datesArray);
          }
          setLocation(response.data?.location.coords);
          setPlace(response.data?.location.placeName);
          setMap(true);
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      images = [];
    };
  }, []);

  const [price, setPrice] = React.useState<number>(0);
  React.useEffect(() => {
    if (seletedDate) {
      const [fromdate, todate] = seletedDate.split(",");

      const time = Math.round(
        (new Date(todate).getTime() - new Date(fromdate).getTime()) / 3600000
      );
      const perhour = vehicle ? Math.round(vehicle?.fairPrice / 24) : 0;

      setPrice(time * perhour);
    }
  }, [seletedDate]);
  type values = {
    pickUpDate: string;
    dropOffDate: string;
    carId: string | null;
    amount: number;
  };
  const [value, setValues] = React.useState<values>({
    dropOffDate: "",
    pickUpDate: "",
    carId: "",
    amount: 0,
  });
  const submitForm = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!carId || !seletedDate) {
      toast.error("pickdate");
    } else {
      const [fromdate, todate] = seletedDate.split(",");
      setValues({
        carId: carId,
        dropOffDate: todate,
        pickUpDate: fromdate,
        amount: price,
      });
      setPaybutton(!paybutton);
    }
  };

  const { RangePicker } = DatePicker;
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const currentDate = dayjs(current);

    // Check if the current date is in the oldbookingDates array
    const isInOldBookingDates = oldbookingDates.some((bookingDate) => {
      const bookingDateObject = dayjs(bookingDate);
      return currentDate.isSame(bookingDateObject, "day");
    });

    return isInOldBookingDates || currentDate.isBefore(dayjs(), "day");
  };
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  return (
    <>
      <MainHeader />
      <div className="sm:grid sm:grid-cols-3 grid-cols-1 sm:gap-4 px-10 py-10">
        <div className="relative w-full col-span-2  h-auto sm:h-screen overflow-y-scroll border-r-2 pr-2">
          <div className="relative h-56 overflow-hidden  md:h-96 ">
            {images.map((image, index) => (
              <div
                key={index}
                className={`duration-700 ease-in-out   ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  className="absolute block  sm:h-80 sm:w-1/2 -translate-x-1/2 px-3 -translate-y-1/2 top-1/2 left-1/2 object-cover"
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="absolute left-4 sm:top-44 top-24 z-30 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none"
            onClick={prevSlide}
          >
            <svg
              className="w-4 h-4  text-gray-400 dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="absolute right-4 sm:top-44 top-24 z-30 flex items-center justify-center  px-4 cursor-pointer group focus:outline-none"
            onClick={nextSlide}
          >
            <svg
              className="w-4 h-4  text-gray-400 dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
          <div className=" p-2 flex flex-col sm:flex-row  justify-center items-center font-semibold sm:text-lg border-2 rounded-md shadow-md ">
            <p className="sm:mr-2"> Pick your date {"->"}</p>

            <RangePicker
              size="middle"
              className="h-12 text-black"
              showTime={{ format: "hh A" }}
              format="YYYY-MM-DD hh A"
              placeholder={["Start Time", "End Time"]}
              onChange={onChange}
              style={{ color: "black" }}
              disabledDate={disabledDate}
              // disabledTime={disabledDateTime}
            />
          </div>
          {seletedDate ? (
            <>
              <div className="sm:h-44 h-auto mt-4 w-full p-2 rounded-lg border-2 shadow-md">
                <div className="h-full  sm:grid sm:grid-cols-2 grid-col-1 p-3">
                  <div className="">
                    <span className="text-lg font-semibold">PickUp</span>
                    <p>
                      {dayjs(seletedDate.split(",")[0]).format(
                        "ddd MMM D YYYY h A"
                      )}
                    </p>
                    <p>{place}</p>
                  </div>
                  <div className="">
                    <span className="text-lg font-semibold">DropOff</span>
                    <p>
                      {dayjs(seletedDate.split(",")[1]).format(
                        "ddd MMM D YYYY h A"
                      )}
                    </p>
                    <p>{place}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="sm:h-44 h-auto mt-4 w-full text-base font-medium p-2 border-2 rounded-lg text-gray-700 shadow-md">
            <div className=" flex justify-between mb-2">
              <p className="text-lg font-bold">
                {vehicle?.vehicleName} <span>{vehicle?.year}</span>
              </p>

              <div className="text-lg font-bold">#</div>
            </div>

            <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 capitalize">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                  height="1em"
                  fill="gray"
                  viewBox="0 0 512 512"
                >
                  <path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                </svg>
                {vehicle?.colour}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                  height="1em"
                  fill="gray"
                  viewBox="0 0 512 512"
                >
                  <path d="M32 64C32 28.7 60.7 0 96 0H256c35.3 0 64 28.7 64 64V256h8c48.6 0 88 39.4 88 88v32c0 13.3 10.7 24 24 24s24-10.7 24-24V222c-27.6-7.1-48-32.2-48-62V96L384 64c-8.8-8.8-8.8-23.2 0-32s23.2-8.8 32 0l77.3 77.3c12 12 18.7 28.3 18.7 45.3V168v24 32V376c0 39.8-32.2 72-72 72s-72-32.2-72-72V344c0-22.1-17.9-40-40-40h-8V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64zM96 80v96c0 8.8 7.2 16 16 16H240c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16z" />
                </svg>
                {vehicle?.fuel}
              </div>
              <div className="flex items-center">
                <svg
                  className="h-6 w-5 mr-1"
                  viewBox="0 0 1024 1024"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z" />
                  <path d="M192 512a320 320 0 1 1 640 0 32 32 0 1 1-64 0 256 256 0 1 0-512 0 32 32 0 0 1-64 0z" />
                  <path d="M570.432 627.84A96 96 0 1 1 509.568 608l60.992-187.776A32 32 0 1 1 631.424 440l-60.992 187.776zM502.08 734.464a32 32 0 1 0 19.84-60.928 32 32 0 0 0-19.84 60.928z" />
                </svg>
                {vehicle?.mileage}
              </div>
              <div className="flex items-center">
                <svg
                  fill="gray"
                  className="h-6 w-6 mr-1"
                  viewBox="-1 0 19 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.417 9.58A7.917 7.917 0 1 1 8.5 1.662a7.917 7.917 0 0 1 7.917 7.916zm-2.93.717L8.981 5.793A2.169 2.169 0 0 0 7.63 5.24l-2.635.026a.815.815 0 0 0-.801.8L4.163 8.71a2.166 2.166 0 0 0 .55 1.352l4.505 4.504a.794.794 0 0 0 1.12 0l3.148-3.15a.794.794 0 0 0 0-1.119zM5.724 6.25a.554.554 0 1 0 .554.554.554.554 0 0 0-.554-.554zm5.306 5.857a.396.396 0 0 1-.56 0l-.246-.246a1.853 1.853 0 0 1-.328.172 1.17 1.17 0 0 1-.465.091c-.034 0-.068 0-.103-.003a.396.396 0 0 1 .057-.79.428.428 0 0 0 .199-.025 1.125 1.125 0 0 0 .198-.102 1.683 1.683 0 0 0 .181-.142 1.004 1.004 0 0 0 .267-.47c.042-.199-.025-.266-.057-.298a.294.294 0 0 0-.186-.083.654.654 0 0 0-.221.024.875.875 0 0 0-.206.097.995.995 0 0 0-.164.134 2.094 2.094 0 0 1-.267.228 1.606 1.606 0 0 1-.422.216 1.305 1.305 0 0 1-.546.06 1.103 1.103 0 0 1-.669-.31 1.118 1.118 0 0 1-.275-1.063 1.688 1.688 0 0 1 .221-.522l-.24-.24a.396.396 0 1 1 .559-.56l.249.248a1.937 1.937 0 0 1 .343-.167 1.388 1.388 0 0 1 .485-.09.396.396 0 0 1 .001.792.595.595 0 0 0-.206.039 1.141 1.141 0 0 0-.208.1l-.02.012a1.122 1.122 0 0 0-.148.106 1.01 1.01 0 0 0-.264.457.334.334 0 0 0 .063.328.326.326 0 0 0 .19.082.528.528 0 0 0 .215-.023.837.837 0 0 0 .211-.109 1.324 1.324 0 0 0 .168-.144 1.793 1.793 0 0 1 .296-.24 1.679 1.679 0 0 1 .399-.187 1.454 1.454 0 0 1 .51-.058 1.082 1.082 0 0 1 .692.314 1.058 1.058 0 0 1 .27 1.022 1.703 1.703 0 0 1-.223.54l.25.251a.395.395 0 0 1 0 .56z" />
                </svg>
                {vehicle?.fairPrice}
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="gray"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  transform="rotate(180)"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M448,387.925V256V124.053c24.768-8.832,42.667-32.277,42.667-60.053c0-35.307-28.715-64-64-64c-35.285,0-64,28.693-64,64 c0,27.776,17.899,51.221,42.667,60.053v110.613h-128V124.053C302.101,115.221,320,91.776,320,64c0-35.307-28.715-64-64-64 s-64,28.693-64,64c0,27.776,17.899,51.221,42.667,60.053v110.613h-128V124.053c24.768-8.832,42.667-32.277,42.667-60.053 c0-35.307-28.715-64-64-64s-64,28.693-64,64c0,27.776,17.899,51.221,42.667,60.053V256c0,11.776,9.536,21.333,21.333,21.333 h149.333v110.592C209.899,396.757,192,420.224,192,448c0,35.285,28.715,64,64,64s64-28.715,64-64 c0-27.776-17.899-51.243-42.667-60.075V277.333h128v110.592c-24.768,8.832-42.667,32.299-42.667,60.075c0,35.285,28.715,64,64,64 c35.285,0,64-28.715,64-64C490.667,420.224,472.768,396.757,448,387.925z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                manual
              </div>
              <div className="flex items-center">
                <svg
                  className="h-7 w-7 mr-1"
                  viewBox="0 0 76 76"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 76.00 76.00"
                >
                  <path
                    fill-opacity="1"
                    stroke-width="0.2"
                    stroke-linejoin="round"
                    d="M 19,47.5L 22.1667,47.5L 22.1667,52.25L 53.8333,52.25L 53.8333,47.5L 57,47.5L 57,55.4167L 19,55.4167L 19,47.5 Z M 23.6049,21.784L 23.6049,34.5429L 23.664,34.5429L 24.6985,32.8358L 27.6247,28.5818L 33.0337,28.5818L 27.8611,34.3115L 33.7726,42.7315L 28.2454,42.7315L 24.728,36.9156L 23.6049,38.3045L 23.6049,42.7315L 19.2085,42.7315L 19.2085,21.784L 23.6049,21.784 Z M 35.1794,42.7315L 35.1794,33.0962L 35.0612,28.5818L 38.8741,28.5818L 39.0514,30.512L 39.1401,30.512C 39.4433,30.0197 39.9535,29.5347 40.6707,29.0567C 41.3878,28.5787 42.3713,28.3219 43.621,28.2863C 44.5802,28.2952 45.4025,28.5128 46.0878,28.939C 46.7731,29.3652 47.2748,29.9466 47.593,30.6832L 47.6521,30.6832C 48.2079,29.9413 48.8232,29.3706 49.498,28.9711C 50.2494,28.5289 51.1283,28.3006 52.1348,28.2863C 53.5439,28.2766 54.6982,28.7667 55.5976,29.7567C 56.497,30.7466 56.9617,32.2942 56.9917,34.3996L 56.9917,42.7315L 52.6172,42.7315L 52.6172,35.036C 52.619,34.0024 52.4523,33.2056 52.1173,32.6457C 51.7823,32.0858 51.2683,31.8026 50.5754,31.796C 50.0645,31.8074 49.6404,31.9581 49.3031,32.2479C 48.9658,32.5378 48.7189,32.8982 48.5623,33.3291L 48.4206,34.4574L 48.4206,42.7315L 44.0461,42.7315L 44.0461,34.7757C 44.0492,33.8794 43.8759,33.1622 43.5262,32.624C 43.1765,32.0858 42.6314,31.8098 41.8909,31.796C 41.3004,31.8177 40.8274,31.9912 40.472,32.3166C 40.1167,32.6421 39.8713,32.9892 39.736,33.3581C 39.5994,33.7197 39.5387,34.0958 39.5539,34.4863L 39.5539,42.7315L 35.1794,42.7315 Z "
                  />
                </svg>
                {vehicle?.fairKm}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  version="1.1"
                  id="_x32_"
                  fill="gray"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path
                      className="st0"
                      d="M399.151,0.039c-35.093-1.211-64.489,26.244-65.692,61.337c-1.219,35.093,26.245,64.507,61.33,65.718   c35.084,1.21,64.498-26.262,65.699-61.347C461.708,30.663,434.235,1.249,399.151,0.039z"
                    />
                    <path
                      className="st0"
                      d="M382.245,153.356c-24.019-9.49-51.188,2.279-60.661,26.324v-0.027l-50.761,126.788l-99.12-29.164   c-21.464-8.173-45.464,2.092-54.358,23.28L54.021,466.845c-6.961,16.56,0.828,35.646,17.414,42.608   c16.585,6.961,35.663-0.837,42.625-17.404l65.78-120.655l76.24,30.17c45.17,18.606,77.068,0,95.665-45.179l56.833-142.35   C418.059,190.007,406.29,162.846,382.245,153.356z"
                    />
                  </g>
                </svg>
                {vehicle?.numofseats}
              </div>
              {vehicle?.specification.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>

          <div className="my-4 ">
            {" "}
            <p className="my-2 text-lg font-bold">Car Location</p>
            {map ? (
              <>
                {" "}
                <StaticMapRoute
                  latitude={Location ? Location.latitude : 0}
                  longitude={Location ? Location.longitude : 0}
                />
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className=" h-96 flex justify-center rounded-lg items-center ">
          <div className=" p-4 h-80 w-80 sm:w-96 text-black shadow-lg flex flex-col  justify-center items-center  rounded-lg">
            <p className=" text-lg font-bold">Please review final amount</p>

            <div className="pt-10 w-56 flex justify-between items-center">
              <span className="text-lg font-extrabold">
                ₹ {price ? price : 0}
              </span>
              {paybutton ? (
                <>
                  <div
                    className="font-medium  flex capitalize"
                    onClick={() => setOpen(true)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="hover:cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 16.5a2.25 2.25 0 0 1-2.25 2.25h-7.5v.75c0 .385.29.702.663.745L9 20.25h9.75a.75.75 0 0 0 .745-.663l.005-.087v-12a.75.75 0 0 0-.663-.745l-.087-.005H18v9.75zM15.75 3.75H6a.75.75 0 0 0-.745.663L5.25 4.5v12c0 .385.29.702.663.745L6 17.25h9.75a.75.75 0 0 0 .745-.663l.005-.087v-12a.75.75 0 0 0-.663-.745l-.087-.005zm-1.5 9.75a.75.75 0 0 1 .087 1.495L14.25 15H7.5a.75.75 0 0 1-.087-1.495L7.5 13.5h6.75zm0-3.75a.75.75 0 0 1 .087 1.495l-.087.005H7.5a.75.75 0 0 1-.087-1.495L7.5 9.75h6.75zm0-3.75a.75.75 0 0 1 .087 1.495l-.087.005H7.5a.75.75 0 0 1-.087-1.495L7.5 6h6.75zM6 18.75a2.25 2.25 0 0 1-2.25-2.25v-12A2.25 2.25 0 0 1 6 2.25h9.75A2.25 2.25 0 0 1 18 4.5v.75h.75A2.25 2.25 0 0 1 21 7.5v12a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v-.75H6z"
                        fill="#10A310"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    fair summary
                    <Transition.Root show={open} as={React.Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={setOpen}
                      >
                        <Transition.Child
                          as={React.Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={React.Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                      <EyeIcon
                                        className="h-6 w-6 text-red-600"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left bg-white">
                                      <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold capitalize leading-6 text-gray-900"
                                      >
                                        fair summary
                                      </Dialog.Title>
                                      <div className="mt-2 border-2 w-96 h-40 text-black capitalize relative rounded-lg p-5  font-semibold">
                                        <p className="text-lg text-gray-500 flex">
                                          vehicle name:{" "}
                                          <span className="text-green-400">
                                            {vehicle?.vehicleName}
                                          </span>
                                        </p>
                                        <p className="text-lg text-gray-500 flex">
                                          vehicle price:{" "}
                                          <span className="text-green-400">
                                            {vehicle?.fairPrice}
                                          </span>
                                        </p>
                                        <p className="text-lg text-gray-500 flex">
                                          discount:{" "}
                                          <span className="text-green-400">
                                            0
                                          </span>
                                        </p>

                                        <p className="text-lg absolute bottom-3 right-5 text-gray-500 flex">
                                          total:{" "}
                                          <span className="text-green-400">
                                            ₹ {price ? price : 0}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                  >
                                    ...ok
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div>
              {user.accessToken ? (
                <>
                  {" "}
                  {vehicle?.status ? (
                    <>
                      {" "}
                      {paybutton ? (
                        <>
                          {" "}
                          <Payment value={value} />
                        </>
                      ) : (
                        <>
                          {" "}
                          <form onSubmit={submitForm}>
                            <button
                              type="submit"
                              className="inline-flex  mt-10 items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-600 focus:shadow-outline focus:outline-none"
                            >
                              Book Now
                            </button>
                          </form>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                        not available at this moment
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  <>
                    {" "}
                    <div
                      onClick={() => Navigate("/UserAuth")}
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                    >
                      login
                    </div>
                  </>
                </>
              )}{" "}
            </div>
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default SingleCar;
