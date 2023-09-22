import { ChangeEvent, FC } from "react";
import { useState, useEffect } from "react";
import {
  userVerifyNumber,
  userVerifyNumberOtp,
} from "../../../services/apis/userApi/userApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";

const MyAccount: FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);
  const [field, setField] = useState<boolean>(true);
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);
  const verifyNumber = async () => {
    try {
      console.log("hi");
      if (number?.trim() && number.length == 10) {
      const {data}:AxiosResponse=  await userVerifyNumber(parseInt(number));
      if(data?.message=='otp sented'){
        setNumber('')
        setField(!field)
      }
      } else {
        setError("Enter 10 digit Phone number");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const verifyOtp = async () => {
    try {
      console.log("helo");
      
      if (number?.trim() && number.length == 6) {
        const {data}:AxiosResponse=  await userVerifyNumberOtp(parseInt(number));
        if(data?.message=='verified'){
          setField(!field)
        }
      } else {
        setError("Enter 6 digit otp");
      }
    } catch (error: any) {
      console.log(error);

      // setError(error.response)
    }
  };
  return (
    <div className="justify-between sm:mt-5">
      <h5 className="sm:m-16 m-10 text-xl text-center font-bold leading-none sm:text-2xl">
        MY Account
      </h5>
      <div className="text-center">
        <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
          Account Details
        </h5>
        <hr className="mb-4 mx-6" />
        <div className="mb-1 sm:mb-2">
          <label htmlFor="email" className="inline-block mb-1 font-medium">
            Email :
          </label>{" "}
          risvanrishuguest0000@gmail.com
        </div>

        {field ? (
          <>
           
            <div className="mb-1 sm:mb-2">
              <label htmlFor="email" className="inline-block  mb-1 font-medium">
                phone Number :
              </label>{" "}
              <input
                placeholder="phone number"
                required
                type="tel"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNumber(e.target.value)
                }
                className="flex-grow text-center h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="otp"
              />
              <button onClick={()=>verifyNumber()} className="text-blue-600">
                verify*
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </>

        ) : (
          <>
         <div className="mb-1 sm:mb-2">
              <label htmlFor="email" className="inline-block  mb-1 font-medium">
                otp
              </label>{" "}
              <input
                placeholder="otp"
                required
                type="text"
                max={6}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNumber(e.target.value)
                }
                className="flex-grow text-center h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                name="otp"
              />
              <button onClick={()=>verifyOtp()} className="text-blue-600">
                verify*
              </button>
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </>
        )}

        <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
          Personal Details
        </h5>
        <hr className="mb-4 mx-6" />
        <div className="mb-1 sm:mb-2">
          <label htmlFor="email" className="inline-block mb-1 font-medium">
            User Name :
          </label>{" "}
          <input
            placeholder="Name"
            required
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
            className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            name="name"
          />
        </div>
        <div className="mb-1 sm:mb-2">
          <label htmlFor="email" className="inline-block mb-1 font-medium">
            gender :
          </label>{" "}
          <select className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline">
            <option selected>Choose a gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <hr className="mb-4 mx-6" />
        <div className="m-4">
          <button className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
