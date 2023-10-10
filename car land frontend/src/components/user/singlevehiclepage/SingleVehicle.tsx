import React, { ChangeEvent, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import { Vehicles } from "../../../interfaces/vehicleInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { userSingleGetVehicle } from "../../../services/apis/userApi/userApi";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";
import Payment from "../payment/Payment";

const SingleVehicle: React.FC = () => {
  const location = useLocation();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [paybutton, setPaybutton] = useState<boolean>(false);
  // const [PayValue, setPayValue] = useState<object|null>(null);
  const [seletedDate, setSeletedDate] = useState<string[] | string>("");
  const queryParams = new URLSearchParams(location.search);
  const [value, setValues] = useState<values>({
    dropOffDate: "",
    pickUpDate: "",
    carId: "",
  });
  const carId: string | null = queryParams.get("carId");
  const user = useAppSelector((state) => state.user);
  const Navigate = useNavigate();
  const { RangePicker } = DatePicker;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userSingleGetVehicle(carId);

        if (response.data?.vehicle) {
          setimage(response.data.vehicle.singleImage);
          setVehicle(response.data?.vehicle);
        }
      } catch {}
    };
    fetchData();
  }, []);
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs();

    if (current.isBefore(today, "day")) {
      return true;
    }
    if (current.isSame(today, "day")) {
      return true;
    }

    const pickUpDates = vehicle?.bookingDates?.pickUp;
    const dropOffDates = vehicle?.bookingDates?.dropOff;

    if (!pickUpDates || !dropOffDates) {
      return false;
    }

    for (let i = 0; i < pickUpDates.length; i++) {
      const pickUpDate = dayjs(pickUpDates[i]);
      const dropOffDate = dayjs(dropOffDates[i]);

      if (
        current.isAfter(pickUpDate, "day") &&
        current.isBefore(dropOffDate, "day")
      ) {
        return true;
      }
    }

    return false;
  };

  function onChange(value: any, dateString: [string, string]) {
    if (value[0] && value[1]) {
      setSeletedDate(dateString);
    }
  }

  type values = {
    pickUpDate: string;
    dropOffDate: string;
    carId: string | null;
  };

  const submitForm = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!carId || seletedDate.length == 0) {
      toast.error("pickdate");
      console.log("error", carId, seletedDate.length);
    } else {
      setValues({
        carId: carId,
        dropOffDate: seletedDate[1],
        pickUpDate: seletedDate[0],
      });
      setPaybutton(!paybutton);
    }
  };
  const [image, setimage] = useState<string>("");

  return (
    <>
      <MainHeader />

      <div className="w-full grid h-screen sm:grid-cols-6 text-center grid-cols-3">
        <div className="sm:m-12 col-span-3  flex flex-col items-center pt-10">
          <div className="sm:h-1/2">
            <img src={image} className="object-cover w-full h-full"   alt="" />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:h-10 ">
            {" "}
            <div className="sm:h-20 sm:w-36 h-14 w-24  mt-4 border-2">
              <img
                src={vehicle?.singleImage}
                onClick={() => {
                  if (vehicle?.singleImage) setimage(vehicle?.singleImage);
                }}
                alt=""
                className="object-cover"
              />
            </div>
            <div className="sm:h-full sm:w-36 h-14 w-24  mt-4 border-2">
              <img
                src={vehicle?.SubImages[1]}
                onClick={() => {
                  if (vehicle?.SubImages) setimage(vehicle?.SubImages[1]);
                }}
                alt=""
                className="object-cover"
              />
            </div>
            <div className="sm:h-20 sm:w-36 h-14 w-24  mt-4 border-2">
              <img
                src={vehicle?.SubImages[2]}
                onClick={() => {
                  if (vehicle?.SubImages) setimage(vehicle?.SubImages[2]);
                }}
                alt=""
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className=" col-span-3 pt-10 sm:pt-0 ">
          <div className=" px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            {/* <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
            <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
            <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" /> */}

            <div className="p-4 sm:p-8 bg-gray-100 rounded">
              <div className="mb-4 text-center">
                <p className="text-xl font-medium capitalize tracking-wide text-black">
                  {vehicle?.vehicleName} <p className="mx-2" /> {vehicle?.year}
                </p>
                <div className="flex items-center justify-center mt-4">
                  <p className="mr-2 text-xl font-semibold text-black sm:text-4xl">
                    ₹ {vehicle?.fairPrice}
                  </p>
                  <p className="text-lg text-gray-500">/ Day</p>
                </div>
              </div>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-black">
                    {vehicle?.mileage} kmpl
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-black">{vehicle?.fuel}</p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-black">manual</p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium flex text-black">
                    {vehicle?.specification.map((Item) => (
                      <p className="mr-2 flex text-green-500 ">{Item} </p>
                    ))}
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-red-600  inline-flex">
                    {vehicle?.hubName}asdfg
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-red-600 inline-flex">
                    Location: Pantheeramkavu, Kozhikode, Kozhikode, Kerala,
                    India
                  </p>
                </li>
                <li className="flex items-center">
                  <div className="mr-3">
                    <svg
                      className="w-4 h-4 text-teal-accent-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-black">
                    {vehicle?.status ? "available" : "not available"}
                  </p>
                </li>
                {price ? (
                  <>
                    {" "}
                    <li className="flex items-center">
                      <div className="mr-3">
                        <svg
                          className="w-4 h-4 text-teal-accent-400"
                          viewBox="0 0 24 24"
                          strokeLinecap="round"
                          strokeWidth="2"
                        >
                          <polyline
                            fill="none"
                            stroke="currentColor"
                            points="6,12 10,16 18,8"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            fill="none"
                            r="11"
                            stroke="currentColor"
                          />
                        </svg>
                      </div>
                      <p className="font-medium text-black">price:{price}</p>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
              <form onSubmit={submitForm}>
                <h1 className="text-lg font-semibold">pick your Date</h1>
                <div className="flex items-center justify-evenly h-28 px-6 mb-4 font-semibold tracking-wide">
                  <RangePicker
                    size="middle"
                    className="h-12"
                    status={`error`}
                    format="YYYY-MM-DD"
                    placeholder={["Start Time", "End Time"]}
                    onChange={onChange}
                    disabledDate={disabledDate}
                  />
                </div>

                {user.accessToken ? (
                  <>
                    {" "}
                    {vehicle?.status ? (
                      <>
                        {" "}
                        {paybutton ? (
                          <>
                            {" "}
                            {/* <button
                              onClick={() => Navigate("/payment")}
                              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                            >
                              pay
                            </button> */}
                            <Payment value={value} />
                          </>
                        ) : (
                          <>
                            {" "}
                            <button
                              type="submit"
                              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                            >
                              Book Now
                            </button>
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
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVehicle;
