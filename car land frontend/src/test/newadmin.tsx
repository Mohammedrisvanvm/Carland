import React from "react";
import { MainHeader } from "../components/userHeader/MainHeader/MainHeader";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { bookingdetails } from "../services/apis/userApi/userApi";
import { IConfirmBookWithImage } from "../interfaces/bookingConfirmInterface";

const newadmin = () => {
  const [details, setDetails] = React.useState<IConfirmBookWithImage[] | null>(
    null
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await bookingdetails();
      if (response.data?.bookingDetails) {
        setDetails(response.data?.bookingDetails);
      }
    };
    fetchData();
  }, [loading]);
  return (
    <>
      <MainHeader />
      <div className="justify-center flex text-4xl font-bold">
        Booking Details
      </div>
      <div className="mt-20 grid gap-2 capitalize">
        {details ? (
          details.map((item) => (
            <>
              <div className="w-full h-40 border-4  text-2xl font-bold p-5 px-28 ">
                <div className="flex justify-evenly">
                  <div>
                    <p>{item._doc.vehicleName}</p>
                  </div>
                  <div>
                    {" "}
                    <p>₹{item._doc.totalPrice}</p>
                  </div>
                </div>
                <div className=" flex justify-center">
                    <p>{item._doc.status}</p>
                  </div>

                <div className=" bg-gray-200 rounded-full dark:bg-gray-700 mt-10">
                  <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center  leading-none rounded-full"
                    style={{ width: "45%" }}
                  >
                    {" "}
                    45%
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <div className="w-full h-40 border-4  flex justify-center items-center">
              no details
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default newadmin;
