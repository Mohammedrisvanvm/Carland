const Step = () => {
  function setShowModal(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center bg-gray-500">
      <div className="w-72 sm:w-1/3 h-4/6 flex flex-col">
        
        <button
          className="text-black text-xl sm:flex sm:justify-center place-self-end"
          onClick={() => setShowModal(false)}
        >
          x
        </button>
        <h1 className="flex font-bold text-2xl pb-5 justify-center">
            {" "}
            guidance
          </h1>
        <div className="px-4 py-8 mx-auto h-96 overflow-y-auto bg-gray-100 ">
         
          <div className="grid gap-6 row-gap-10 ">
            <div className="">
              <div className="flex">
                <div className="flex flex-col items-center mr-4 ">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full ">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300 " />
                </div>
                <div className="pt-1 pb-8 ">
                  <p className="mb-2 text-lg font-bold text-blue-500">
                    Step 1:booked
                  </p>
                  <p className="text-gray-700 ">
                    In this step, it is communicated that the vehicle you are
                    looking for or have reserved is currently located at a hub
                    station. This information implies that the vehicle is ready
                    and accessible for your use or pickup at the specified hub
                    station.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold  text-yellow-400">
                    Step 2 :pickup
                  </p>
                  <p className="text-gray-700">
                    In this step, you are instructed to proceed with the pickup
                    process for the vehicle that is available at the hub station
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold text-yellow-500 ">
                    Step 3: ongoing
                  </p>
                  <p className="text-gray-700">
                    In this step, it is indicated that you have successfully
                    picked up the vehicle, and it is now in your possession for
                    your intended use. The "Ongoing" step signifies the
                    continuation of your journey or activity with the vehicle
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4 ">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold text-orange-400">
                    Step 3.1:extend
                  </p>
                  <p className="text-gray-700">
                    In this step, you have the option to extend your journey or
                    the use of the vehicle beyond the originally planned
                    duration. This step is typically relevant for situations
                    where you are using a rented vehicle or participating in a
                    shared mobility service and wish to prolong your usage.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-4 text-gray-600"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <line
                          fill="none"
                          strokeMiterlimit="10"
                          x1="12"
                          y1="2"
                          x2="12"
                          y2="22"
                        />
                        <polyline
                          fill="none"
                          strokeMiterlimit="10"
                          points="19,15 12,22 5,15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-px h-full bg-gray-300" />
                </div>
                <div className="pt-1 pb-8">
                  <p className="mb-2 text-lg font-bold text-green-400">
                    Step 5:dropOff/completed
                  </p>
                  <p className="text-gray-700">
                    In this final step, you have concluded your journey or use
                    of the vehicle, and it's time to return or drop off the
                    vehicle to its designated location.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div>
                    <div className="flex items-center  justify-center w-10 h-10 border rounded-full">
                      <svg
                        className="w-6 text-gray-600"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <polyline
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          points="6,12 10,16 18,8"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-1">
                  <p className="mb-2 text-lg font-bold text-green-600">
                    Success
                  </p>
                  <p className="text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step;
