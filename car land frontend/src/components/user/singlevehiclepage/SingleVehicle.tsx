import React, { ChangeEvent, useEffect, useState } from "react";
import { MainHeader } from "../../userHeader/MainHeader/MainHeader";
import {
  bookingCar,
  userSingleGetVehicle,
} from "../../../services/apis/userApi/userApi";
import { useLocation, useNavigate } from "react-router";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { Vehicles } from "../../../interfaces/vehicleInterface";

import { useFormik } from "formik";
import { bookingDateSchema } from "../../../validationSchemas/validationSchema";
import Payment from "../payment/Payment";
import { useAppSelector } from "../../../redux/store/storeHook";

const SingleVehicle: React.FC = () => {
  const location = useLocation();
  const [vehicle, setVehicles] = useState<Vehicles | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [paybutton, setPaybutton] = useState<boolean>(false);
  // const [PayValue, setPayValue] = useState<object|null>(null);
  const queryParams = new URLSearchParams(location.search);
  const [pickUpDate, setPickUpDate] = useState<Date>(new Date());
  const [dropDate, setDropDate] = useState<Date>(pickUpDate);
  const carId: string | null = queryParams.get("carId");
  const user=useAppSelector((state)=>state.user)
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userSingleGetVehicle(carId);
        console.log(response);
        if (response.data?.vehicle) {
          setVehicles(response.data?.vehicle);
        }
      } catch {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    var date1: Date = new Date(pickUpDate);
    var date2: Date = new Date(dropDate);

    var Difference_In_Time: number = date2.getTime() - date1.getTime();

    var Difference_In_Days: number = Difference_In_Time / (1000 * 3600 * 24);
    if (vehicle?.fairPrice) {
      setPrice(Difference_In_Days * vehicle?.fairPrice);
    }
  }, []);
  console.log(price, 111);

  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + 1);

  const minDate = currentDate.toISOString().split("T")[0];

  console.log(pickUpDate, dropDate);

  useEffect(() => {
    const nextDay = new Date(pickUpDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setDropDate(nextDay);
  }, [pickUpDate]);

  type Idates = {
    pickUpDate: string;
    dropDate: string;
    time: string;
    carId?: string;
  };
  const initialValues: Idates = {
    pickUpDate: "",
    dropDate: "",
    time: "",
    carId: "",
  };

  const submitForm = async (values: Idates): Promise<void> => {
    if (carId) values.carId = carId;

    console.log(values, 12);
    // setPayValue(values)
    setPaybutton(!paybutton);
    // bookingCar(values)
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: submitForm,
    initialErrors: {},
    initialTouched: {},
    validateOnMount: true,
    validationSchema: bookingDateSchema,
  });
  console.log(errors, touched);

  return (
    <>
      <MainHeader />

      <div className="w-full grid h-screen sm:grid-cols-6 text-center grid-cols-3">
        <div className=" sm:m-24 col-span-3">
          <div className="h-2/3 w-full flex justify-center">
            <img src={vehicle?.SubImages[0]} className="" alt="" />
          </div>
          <div className="flex flex-row justify-evenly mx-2 mt-5">
            <div className=" mx-2 object-fit">
              <img
                src={vehicle?.singleImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" mx-2 object-fit">
              <img
                src={vehicle?.SubImages[1]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" mx-2 object-fit">
              <img
                src={vehicle?.SubImages[2]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className=" m-4 col-span-3 mb-4  ">
          <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            {/* <div className="w-11/12 h-2 mx-auto bg-gray-900 rounded-b opacity-75" />
            <div className="w-10/12 h-2 mx-auto bg-gray-900 rounded-b opacity-50" />
            <div className="w-9/12 h-2 mx-auto bg-gray-900 rounded-b opacity-25" /> */}

            <div className="p-8 bg-gray-100 rounded">
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
              <form onSubmit={handleSubmit}>
                <label htmlFor="pickDate">Pick Time:</label>

                <select
                  id="picktime"
                  required
                  value={values.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="time"
                >
                  <option value="">select time</option>
                  <option value="9am to 12am">9am to 12am</option>
                  <option value="12pm to 3pm">12pm to 3pm</option>
                  <option value="3pm to 6pm">3pm to 6pm</option>
                </select>

                <div className="flex items-center justify-evenly h-28 px-6 mb-4 font-semibold tracking-wide">
                  <div className="flex flex-col items-center">
                    <label htmlFor="">pick Up Date :</label>
                    <input
                      type="Date"
                      className={`${
                        errors.pickUpDate && touched.pickUpDate
                          ? "input-error"
                          : ""
                      } block text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                      placeholder=" "
                      value={values.pickUpDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="pickUpDate"
                      required
                    />
                    {errors.pickUpDate && touched.pickUpDate && (
                      <p className="border-red-500 text-sm text-red-500">
                        {errors.pickUpDate}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <label htmlFor="">Drop Date :</label>
                    <input
                      type="Date"
                      className={`${
                        errors.dropDate && touched.dropDate ? "input-error" : ""
                      } block text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                      placeholder=" "
                      value={values.dropDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="dropDate"
                      required
                    />
                    {errors.dropDate && touched.dropDate && (
                      <p className="border-red-500 text-sm text-red-500">
                        {errors.dropDate}
                      </p>
                    )}
                  </div>
                </div>

                {user.accessToken ? <> {vehicle?.status ? (
                  <>
                    {" "}
                    {paybutton ? (
                      <>
                        {" "}
                        {/* <button onClick={()=>Navigate('/payment')} className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                      pay
                    </button> */}
                        <Payment value={values} />
                      </>
                    ) : (
                      <>
                        {" "}
                        <button
                          type="submit"
                          disabled={isSubmitting}
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
                )}</>:<>  <>
                {" "}
                <div onClick={()=>Navigate('/UserAuth')} className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                 login
                </div>
              </></>}
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVehicle;
