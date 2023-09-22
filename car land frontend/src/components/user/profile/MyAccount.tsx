import { ChangeEvent, FC, FormEvent } from "react";
import { useState, useEffect } from "react";
import {
  userVerifyNumber,
  userVerifyNumberOtp,
  userprofileData,
} from "../../../services/apis/userApi/userApi";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setVerify, userLogout } from "../../../redux/slice/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyAccount: FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [error1, setError1] = useState<string | null>(null);
  const [number, setNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [field, setField] = useState<boolean>(true);
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (error || error1) {
      timer = setTimeout(() => {
        setError(null);
        setError1(null);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error, error1]);
  const verifyNumber = async () => {
    try {
      if (number?.trim() && number.length == 10) {
        const { data }: AxiosResponse = await userVerifyNumber(
          parseInt(number)
        );
        if (data?.message == "otp sented") {
          setNumber("");
          setField(!field);
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

      if (otp?.trim() && otp.length == 6) {
        const { data }: AxiosResponse = await userVerifyNumberOtp(
          parseInt(otp)
        );
        if (data?.message == "verified") {
          setField(!field);
          toast.success("verified")
          dispatch(setVerify())
        }
      } else {
        setError("Enter 6 digit otp");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const trimmedUserName = userName?.trim();

      if (
        trimmedUserName &&
        trimmedUserName.length >= 3 &&
        !/\s/.test(trimmedUserName)
      ) {
        await userprofileData(gender, trimmedUserName);
      } else if (gender) {
        await userprofileData(gender, user.userName);
      } else {
        setError1(
          "Invalid username. Username must be at least 3 characters long and should not contain spaces."
        );
      }
    } catch (error: any) {
      console.log(error);

      if (error.response.data?.message == "Access Denied") {
        dispatch(userLogout());
        Navigate("/");
      }
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
        {!user.verifyPhone ? (
          <>
            {" "}
            {field ? (
              <>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="email"
                    className="inline-block  mb-1 font-medium"
                  >
                    phone Number :
                  </label>{" "}
                  <input
                    placeholder="phone number"
                    required
                    type="tel"
                    value={number}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNumber(e.target.value)
                    }
                    className="flex-grow text-center h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    name="otp"
                  />
                  <button
                    onClick={() => verifyNumber()}
                    className="text-blue-600"
                  >
                    verify*
                  </button>
                  {error && <p className="text-red-600">{error}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="email"
                    className="inline-block  mb-1 font-medium"
                  >
                    otp
                  </label>{" "}
                  <input
                    placeholder="otp"
                    required
                    type="text"
                    value={otp}
                    max={6}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setOtp(e.target.value)
                    }
                    className="flex-grow text-center h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    name="otp"
                  />
                  <button onClick={() => verifyOtp()} className="text-blue-600">
                    verify*
                  </button>
                  {error && <p className="text-red-600">{error}</p>}
                </div>
              </>
            )}
          </>
        ) : (
          <li className="flex flex-row justify-center items-center">
          Mobile Number
          <span>
            <img
              className="h-5 w-5"
              src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
              alt=""
            />
          </span>
        </li>
        )}

        <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
          Personal Details
        </h5>
        <hr className="mb-4 mx-6" />
        <form onSubmit={handleSubmit}>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="email" className="inline-block mb-1 font-medium">
              User Name :
            </label>{" "}
            <input
              placeholder={
                user?.userName ? user?.userName.toLocaleLowerCase() : ""
              }
              value={userName ? userName : ""}
              type="text"
              minLength={3}
              title="Only alphabetic characters are allowed"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
              className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              name="userName"
            />
            {error1 && <p className="text-red-600">{error1}</p>}
          </div>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="email" className="inline-block mb-1 font-medium">
              gender :
            </label>{" "}
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setGender(e.target.value)
              }
              required
              className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled selected>
                Choose a gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <hr className="mb-4 mx-6" />
          <div className="m-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
