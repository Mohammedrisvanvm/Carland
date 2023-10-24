import React, { ChangeEvent, FC } from "react";

import { Pagination } from "antd";
import { useNavigate } from "react-router";
import { IConfirmBookWithImage } from "../../../interfaces/bookingConfirmInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { getBookingsManagement } from "../../../services/apis/adminApi/adminApi";

type Iprop = {
  sidebarWidth?: boolean;
};
const AdminBooking: FC<Iprop> = ({ sidebarWidth }) => {
  const [bookings, setBookings] = React.useState<
    IConfirmBookWithImage[] | null
  >(null);
  const Navigate = useNavigate();
  const id = useAppSelector((state) => state.vendor.hubId);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalpage, setTotalpage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await getBookingsManagement(
          search,
          currentPage
        );
        console.log(response);

        if (response.data?.bookingDetails)
          setBookings(response.data.bookingDetails);
        if (response.data?.count) {
          setTotalpage(Math.ceil(response.data.count / 5));
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage]);

  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed w-5/6 transition-all duration-200 ease-in-out h-96`}
        style={{ height: "560px" }}
      >
        <div className="flex relative justify-between  py-5 ">
          {" "}
          <div className="w-10 h-5">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>filter</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 over">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                index
              </th>
              <th scope="col" className="px-5 py-3">
                vehicle image
              </th>
              <th scope="col" className="px-5 py-3">
                Vehicle Name
              </th>
              <th scope="col" className="px-5 py-3">
                hubName
              </th>
              <th scope="col" className=" py-3">
                pickUp location
              </th>

              <th scope="col" className="px-3 py-3">
                bookingStartDate
              </th>

              <th scope="col" className="px-3 py-3">
                bookingEndDate
              </th>

              <th scope="col" className="px-3 py-3">
                days
              </th>
              <th scope="col" className="px-3 py-3">
                totalPrice
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {bookings
              ? bookings.map((item, index) => (
                  <tr
                    key={item._doc._id}
                    className="bg-white py-2 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1 + (currentPage - 1) * 5}
                    </td>
                    <td className="px-6 py-2">
                      <img
                        src={item.image}
                        className="w-16 h-12 object-cover"
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.vehicleName}
                    </td>
                    <td className="px-6 py-2">{item._doc.hubName}</td>
                    <td className=" py-2">{item._doc.locationName}</td>
                    <td
                      scope="row"
                      className="px-6  py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(
                        item._doc.bookingStartDate
                      ).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item._doc.bookingEndDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-2">{item._doc.days}</td>
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.totalPrice}
                    </td>
                    <td className="px-6 py-2">
                      <div className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                        <span
                          className={`${
                            item._doc.status ? "text-red-600" : "text-blue-600 "
                          }`}
                        >
                          {item._doc.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div className="text-center mt-10">
          <Pagination
            className="text-black"
            onChange={(page: number, pageSize: number) => setCurrentPage(page)}
            current={currentPage}
            total={totalpage * 10}
          />
        </div>
      </div>
    </>
  );
};

export default AdminBooking;
