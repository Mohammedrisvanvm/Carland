import { useEffect, useState } from "react";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import { useNavigate } from "react-router";
import { IHub } from "../../../test/test";
import { getHub } from "../../../services/apis/vendorApi/vendorApi";
import { useDispatch } from "react-redux";
import { addhubId } from "../../../redux/slice/vendorSlice";

const VendorHomePage = () => {
  const [hubs, setHubs] = useState<IHub[]>([]);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: any = await getHub();
        console.log(response.data.hubs);

        setHubs(response.data.hubs);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-200">
      <VendorNavBar />
      <div className="relative px-4 h-screen py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <span className="self-center flex justify-center my-14 text-black text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          HUBS
        </span>
        <div className="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0">
          <svg
            viewBox="0 0 88 88"
            className="w-full max-w-screen-xl text-indigo-100"
          >
            <circle
              fillOpacity="0.2"
              fill="currentColor"
              cx="44"
              cy="44"
              r="37.5"
            />
            <circle
              fillOpacity="0.3"
              fill="currentColor"
              cx="44"
              cy="44"
              r="29.5"
            />
            <circle
              fillOpacity="0.3"
              fill="currentColor"
              cx="44"
              cy="44"
              r="22.5"
            />
          </svg>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hubs
            ? hubs.map((item) => (
                <div
                  onClick={() => {
                    dispatch(addhubId(item));
                    Navigate('/vendor/vendordashboard')
                  }}
                  className={`${
                    item.isVerified
                      ? "enabled:hover:border-gray-400"
                      : "opacity-50 pointer-events-none"
                  } flex justify-center items-center h-48 overflow-hidden bg-contain transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl`}
                  style={{
                    backgroundImage: `url('${item.hubImage}')`,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span className="self-center flex text-white justify-center my-14 text-black text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    {item.hubName}
                  </span>
                </div>
              ))
            : null}
          <div
            onClick={() => Navigate("/vendor/addhub")}
            className="flex justify-center items-center h-48 overflow-hidden transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
          >
            <svg
              className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
