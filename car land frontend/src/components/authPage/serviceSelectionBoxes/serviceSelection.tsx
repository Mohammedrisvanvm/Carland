import { Button } from "flowbite-react";
import { useNavigate } from "react-router";

export const service = () => {
  const Navigate = useNavigate();
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="df31b9f6-a505-42f8-af91-d2b7c3218e5c"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#df31b9f6-a505-42f8-af91-d2b7c3218e5c)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">The journey</span>
          </span>{" "}
          of a thousand miles begins with a single step
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          The journey of a thousand miles begins with a single step
        </p>
      </div>

      <div className="flex justify-evenly">
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://i0.wp.com/www.afcarrental.com.my/wp-content/uploads/2021/11/fortuner-afcarrental.jpg?fit=640%2C400&ssl=1"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">Pick your Rent Cars</h6>
          <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
            Rent a car and explore the city at your own pace
          </p>
          <button
            onClick={() => Navigate("/selectcity")}
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </button>
        </div>
        {/* <div className="sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://resize.indiatvnews.com/en/resize/newbucket/730_-/2017/06/cab-1497595760.jpg"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">Pick your Cab Cars</h6>
          <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
            Cabs are a great way to meet new people{" "}
          </p>
          <button
            onClick={() => Navigate("/cab/cabhome")}
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </button>
        </div> */}
      </div>
    </div>
  );
};
export const ServiceSelection = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-8 border-b sm:border-r">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">The quick fox</h6>
            <p className="mb-3 text-sm text-gray-900">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium rem aperiam, eaque ipsa quae. Sit error voluptatem.
            </p>
          </div>
        </div>
        <div className="p-8 border-b lg:border-r">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">Leverage agile</h6>
            <p className="mb-3 text-sm text-gray-900">
              Storage shed, troughs feed bale manure, is garden wheat oats at
              augers. Bulls at rose garden cucumbers mice sunflower wheat in
              pig.
            </p>
          </div>
        </div>
        <div className="p-8 border-b sm:border-r lg:border-r-0">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">Organically grow</h6>
            <p className="mb-3 text-sm text-gray-900">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium rem aperiam, eaque ipsa quae. Sit error voluptatem.
            </p>
          </div>
        </div>
        <div className="p-8 border-b lg:border-b-0 lg:border-r">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">Have a good one</h6>
            <p className="mb-3 text-sm text-gray-900">
              Storage shed, troughs feed bale manure, is garden wheat oats at
              augers. Bulls at rose garden cucumbers mice sunflower wheat in
              pig.
            </p>
          </div>
        </div>
        <div className="p-8 border-b sm:border-b-0 sm:border-r">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">Trough pomfret</h6>
            <p className="mb-3 text-sm text-gray-900">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium rem aperiam, eaque ipsa quae. Sit error voluptatem.
            </p>
          </div>
        </div>
        <div className="p-8">
          <div className="max-w-md text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-16 sm:h-16">
              <svg
                className="w-8 h-8 text-deep-purple-accent-400 sm:w-12 sm:h-12"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
            <h6 className="mb-2 font-semibold leading-5">Disrupt inspire</h6>
            <p className="mb-3 text-sm text-gray-900">
              Storage shed, troughs feed bale manure, is garden wheat oats at
              augers. Bulls at rose garden cucumbers mice sunflower wheat in
              pig.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};