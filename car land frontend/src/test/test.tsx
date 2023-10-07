import React, { Dispatch, SetStateAction } from "react";
import scroll from './CustomScrollbar.module.css'
type prop = {
  setloading: Dispatch<SetStateAction<boolean>>;
  loading:boolean
};
const BookingDetails:React.FC<prop> = ({loading,setloading}) => {
  return (<>
  
    <div className="justify-between sm:mt-5 h-96">
      <h5 className=" m-10 text-xl text-center font-bold leading-none sm:text-2xl">
        MY Bookings
      </h5>
      <div style={{height:"565px" }} className={`text-center overflow-y-scroll ${scroll.customScrollbar} `}>    

        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                {" "}
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded  border-2 mb-3 w-full h-52  sm:64 p-3">
          <div className="h-44 rounded-2xl  py-2 px-2 relative sm:flex sm:justify-start ">
            <img
              className=" rounded-2xl w-1/3 h-40 object-contain  "
              src="https://static.autox.com/uploads/cars/2018/01/lamborghini-urus-11-Jan-2018.jpg"
              alt=""
            />

            <div className=" absolute right-2 top-2 border-2 text-lg font-bold text-blue-500 rounded-2xl sm:w-1/2 w-52 h-40 pt-2">
              {" "}
              <p>LAMBORGINI URUS</p>
              <p>2002</p>
              <p>Location</p>
              <div className="flex justify-evenly items-center mt-4">
                
                <p className="text-green-600 font-semibold text-sm">
                  Completed
                </p>
                <button
                  type="button"
                  className="bg-black text-white rounded font-normal px-5 py-1"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </>
  );
};

export default BookingDetails;
