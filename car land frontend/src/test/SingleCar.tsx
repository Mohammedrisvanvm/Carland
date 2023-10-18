import React, { FC,ChangeEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import { useAppSelector } from "../redux/store/storeHook";
import { useLocation, useNavigate } from "react-router";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { userSingleGetVehicle } from "../services/apis/userApi/userApi";
import { Vehicles } from "../interfaces/vehicleInterface";
import Payment from "../components/user/payment/Payment";
import { toast } from "react-toastify";
const images: string[] = [];

const SingleCar: FC = () => {
  const [vehicle, setVehicle] = React.useState<Vehicles | null>(null);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [seletedDate, setSeletedDate] = React.useState<string[] | string>("");
const Navigate=useNavigate()
  const location = useLocation();
  const [paybutton, setPaybutton] = React.useState<boolean>(false);
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
  function onChange(value: any, dateString: [string, string]) {
    if (value[0] && value[1]) {
      setSeletedDate(dateString);
    }
  }
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await userSingleGetVehicle(carId);

        if (response.data?.vehicle) {
          setVehicle(response.data?.vehicle);
          images.push(response.data.vehicle?.singleImage);
          response.data.vehicle?.SubImages.forEach((image) => {
            images.push(image);
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [price,setPrice]=React.useState<number>(0)
React.useEffect(()=>{
console.log(seletedDate);
const date1 = new Date(seletedDate[0]);
const date2 = new Date(seletedDate[1]);

// Calculate the time difference in milliseconds
const timeDifference = date2.getTime() - date1.getTime();

// Calculate the number of days
const daysDifference = timeDifference / (1000 * 3600 * 24);
if(vehicle){
    setPrice(daysDifference*vehicle?.fairPrice)
}
console.log(`Number of days between the two dates: ${daysDifference}`);

},[seletedDate])
type values = {
    pickUpDate: string;
    dropOffDate: string;
    carId: string | null;
  };
const [value, setValues] = React.useState<values>({
    dropOffDate: "",
    pickUpDate: "",
    carId: "",
  });
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
  return (
    <>
      <MainHeader />
      <div className="sm:grid sm:grid-cols-3 grid-cols-1 sm:gap-4">
        <div className="relative w-full col-span-2  h-auto sm:h-screen overflow-y-scroll">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96 bg-gray-300">
            {images.map((image, index) => (
              <div
                key={index}
                className={`duration-700 ease-in-out   ${
                  activeSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image}
                  className="absolute block bg-gray-300 sm:h-80 sm:w-1/2 -translate-x-1/2 px-3 -translate-y-1/2 top-1/2 left-1/2 object-cover"
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
              className="w-4 h-4 text-white dark:text-gray-800"
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
              className="w-4 h-4 text-white dark:text-gray-800"
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
          <div className=" pt-4 flex flex-col sm:flex-row  justify-center items-center font-semibold sm:text-lg">
            <p className="sm:mr-2"> Pick your date {"->"}</p>
           
            <RangePicker
              size="middle"
              className="h-12"
              format="YYYY-MM-DD"
              placeholder={["Start Time", "End Time"]}
              onChange={onChange}
              // disabledDate={disabledDate}
            />
          </div>

          <div className="sm:h-44 h-auto mt-4 w-full p-2">
            <div className="h-full border-4 sm:grid sm:grid-cols-3 grid-col-1 p-3">
              <div className="">
                <span className="text-lg font-semibold">From</span>
                <p>Thu, 19 Oct, 08:00 AM</p>
                <p>
                  Housing Society, A603, Bhumkar Nagar, Wakad, Pimpri-Chinchwad
                  411057, India
                </p>
              </div>
              <div className="">
                <span className="text-lg font-semibold">To</span>
                <p>Thu, 19 Oct, 08:00 AM</p>
                <p>
                  Housing Society, A603, Bhumkar Nagar, Wakad, Pimpri-Chinchwad
                  411057, India
                </p>
              </div>
              <div className="">
                <span className="text-lg font-semibold">from</span>
              </div>
            </div>
          </div>
          <div className="sm:h-44 h-auto mt-4 w-full text-base font-medium p-2 border-2 border-gray-500 bg-gray-200">
            <div className=" flex justify-between mb-2">
              <p className="text-lg font-bold">
                {vehicle?.vehicleName} <span>{vehicle?.year}</span>
              </p>

              <div className="text-lg font-bold">car land</div>
            </div>

            <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 capitalize">
              <div>colour:{vehicle?.colour}</div>
              <div>fuel:{vehicle?.fuel}</div>
              <div>mileage:{vehicle?.mileage}</div>
              <div>fairPrice:{vehicle?.fairPrice}</div>

              <div>Transmission:manual</div>
              <div>fairKm:{vehicle?.fairKm}</div>
              <div>numofseats:{vehicle?.numofseats}</div>
              {vehicle?.specification.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-300 h-96 flex justify-center rounded-lg items-center ">
          <div className=" p-4 h-80 w-80 sm:w-96 bg-white shadow-md flex flex-col justify-center items-center border-4 rounded-lg">
            <p className=" text-lg font-bold">Please review final amount</p>

            <div className="pt-10 w-56 flex justify-between items-center">
              <span className="text-lg font-extrabold text-black">₹ {price ? price :0}</span>
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
                                  <ExclamationTriangleIcon
                                    className="h-6 w-6 text-red-600"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                  <Dialog.Title
                                    as="h3"
                                    className="text-base font-semibold leading-6 text-gray-900"
                                  >
                                    Deactivate account
                                  </Dialog.Title>
                                  <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                      Are you sure you want to deactivate your
                                      account? All of your data will be
                                      permanently removed. This action cannot be
                                      undone.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                onClick={() => setOpen(false)}
                              >
                                Deactivate
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
                            <form  onSubmit={submitForm}>
                            <button
                              type="submit"
                             
                              className="inline-flex  mt-10 items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-700 focus:shadow-outline focus:outline-none"
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
                )}
              {" "}
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCar;
