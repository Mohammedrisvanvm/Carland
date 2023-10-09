import React, { FC, useEffect, useState } from "react";

import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { IConfirmBookWithImage } from "../../../interfaces/bookingConfirmInterface";
import AdminNavBar from "../adminNav/adminNav";
import AdminAside from "../adminAside/adminAside";
import { getBookingsManagement } from "../../../services/apis/adminApi/adminApi";

const VendorBookingManagement: FC = () => {
  const [bookings, setBookings] = useState<IConfirmBookWithImage[] | null>(
    null
  );
  const id = useAppSelector((state) => state.vendor.hubId);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse = await getBookingsManagement();
        console.log(response);
        if (response.data?.bookingDetails)
          setBookings(response.data.bookingDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="absolute">
        <AdminNavBar />
        <div className="flex">
          <AdminAside />

          <div className="sm:ml-20">
            <div className="relative top-16">
              <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      index
                    </th>
                    <th scope="col" className="px-6 py-3">
                      vehicle image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vehicle Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      hubName
                    </th>

                    <th scope="col" className="px-6 py-3">
                      bookingStartDate
                    </th>

                    <th scope="col" className="px-6 py-3">
                      bookingEndDate
                    </th>

                    <th scope="col" className="px-6 py-3">
                      days
                    </th>
                    <th scope="col" className="px-6 py-3">
                      totalPrice
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings
                    ? bookings.map((item, index) => (
                        <tr
                          key={item._doc._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <img
                              src={item.image}
                              className="w-16 h-12 object-cover"
                            />
                          </td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item._doc.vehicleName}
                          </td>
                          <td className="px-6 py-4">{item._doc.hubName}</td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {new Date(
                              item._doc.bookingStartDate
                            ).toLocaleDateString()}
                          </td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {new Date(
                              item._doc.bookingEndDate
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">{item._doc.days}</td>
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item._doc.totalPrice}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                              <span
                                className={`${
                                  item._doc.status
                                    ? "text-red-600"
                                    : "text-blue-600 "
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VendorBookingManagement;
