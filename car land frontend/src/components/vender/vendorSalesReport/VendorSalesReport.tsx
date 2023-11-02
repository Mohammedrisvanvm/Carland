import React, { ChangeEvent, FC, useEffect } from "react";

import { Pagination } from "antd";
import { IConfirmBook } from "../../../interfaces/bookingConfirmInterface";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import PDF from "../../../utils/pdf";
import { salesReportsVendor } from "../../../services/apis/vendorApi/vendorApi";

type Iprop = {
  sidebarWidth: boolean;
};

const VendorSalesReport: FC<Iprop> = ({ sidebarWidth }) => {
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [totalpage, setTotalpage] = React.useState<number>(1);
  const [salesReports, setSalesReports] = React.useState<IConfirmBook[] | null>(
    null
  );
  const componentPrint = React.useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [loader, setLoader] = React.useState<boolean>(false);
  const id = useAppSelector((state) => state.vendor.hubId);
  React.useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response: any = [];
        const response: AxiosResponse = await salesReportsVendor(
          id,
          search,
          currentPage
        );

        if (response.data?.salesReport && response.data.salesReportTotal) {
          setSalesReports(response.data.salesReport);
          setTotalAmount(response.data.salesReportTotal);
        }

        if (response.data?.count) {
          setTotalpage(Math.ceil(response.data.count / 5));
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, currentPage, loader]);
  console.log(salesReports);

  return (
    <React.Fragment>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed w-6/6 transition-all duration-200 ease-in-out h-96`}
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
        <div className="flex justify-end m-4">
          <PDF print={componentPrint} />
        </div>

        <div ref={componentPrint}>
          <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 over">
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
            </thead>{" "}
            {salesReports?.length == 0 ? (
              <>
                <div className="text-red-500 flex justify-center">
                  "no completed service"
                </div>
              </>
            ) : (
              salesReports?.map((item, index) => (
                <tbody className="">
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      scope="row"
                      className="px-3  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + ((currentPage - 1) * 5 + 1)}
                    </td>
                    <td className="px-3 ">
                      <img
                        src={item.image}
                        className="w-16 h-12 object-cover"
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.vehicleName}
                    </td>
                    <td
                      scope="row"
                      className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item.bookingStartDate).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item.bookingEndDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 ">{item.days}</td>
                    <td
                      scope="row"
                      className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.totalPrice}
                    </td>
                    <td className="px-3 ">
                      <button className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                        <span className="text-green-500">{item.status}</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>{" "}
          <div className="text-center mt-10 removediv">
            <Pagination
              className="text-black"
              onChange={(page: number, pageSize: number) =>
                setCurrentPage(page)
              }
              current={currentPage}
              total={totalpage * 10}
            />
          </div>
          <div className="absolute bottom-4 right-5">
            <p className=" text-green-500 capitalize font-semibold text-4xl">
              total: <span>{totalAmount}</span>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VendorSalesReport;
