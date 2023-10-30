import React, { FC, ChangeEvent } from "react";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { vendorProfile } from "../../../services/apis/vendorApi/vendorApi";
import { hub } from "../../../interfaces/userAuth";
import StaticMapRoute from "../../user/profile/StaticMapRoute";

import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
type Iprop = {
  sidebarWidth: boolean;
};
const VendorProfile: FC<Iprop> = ({ sidebarWidth }) => {
  const vendor = useAppSelector((state) => state.vendor);
  const cancelButtonRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [hub, setHub] = React.useState<hub | null>();

  React.useEffect(() => {
    const fetchData = async () => {
      const res: AxiosResponse = await vendorProfile(vendor.hubId);
      console.log(res.data?.hub);
      if (res.data?.hub) {
        setHub(res.data.hub);
      }
    };
    fetchData();
  }, []);

  const today = new Date(
    new Date(hub?.validityDate ? hub?.validityDate : new Date())
  ); // Get the current date
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const minDate = thirtyDaysAgo.toISOString().split("T")[0];

  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed capitalize transition-all duration-200 ease-in-out h-full overflow-y-scroll  w-5/6`}
      >
        <div className="flex  justify-center  p-10">
          <div>
            <p className="font-bold text-5xl flex justify-center mb-8">
              {hub?.hubName}
            </p>
            <div className="w-full h-44  flex ">
              <img src={hub?.hubMultiImage[0]} alt="" className="mr-2" />
              <img src={hub?.hubImage} alt="" />
            </div>
            <hr className="my-5 " />
            <p className="font-semibold text-xl mt-5">verify status</p>

            <hr className="my-2 " />
            <div className="flex">
              status:
              {hub?.isVerified ? (
                <>
                  {" "}
                  <span className="flex">
                    verified
                    <img
                      className="h-5 w-5"
                      src="https://cdn-icons-png.flaticon.com/512/7595/7595571.png"
                      alt=""
                    />
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  <span>
                    <img
                      className="h-4 w-4"
                      src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                      alt=""
                    />
                  </span>
                </>
              )}
            </div>

            <hr className="my-5 " />
            <p className="font-semibold text-xl   mt-5">license</p>
            <hr className="my-2 " />
            <div className="w-full h-44  flex ">
              <img src={hub?.license} alt="" className="mr-2" />
            </div>
            <hr className="my-5 " />
            <p className="font-semibold text-xl   mt-5 ">impotant dates</p>
            <hr className="my-2 " />
            <div className=" text-lg flex justify-between">
              <div className="text-red-500">
                Validity Date:{" "}
                {hub?.validityDate
                  ? new Date(hub.validityDate).toDateString()
                  : "N/A"}
              </div>

              <div className="">
                <input
                  type="date"
                  min={minDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    console.log(e.target.value);
                    console.log(new Date(e.target.value).toLocaleDateString());
                  }}
                />
              </div>
            </div>

            <hr className="my-1 " />
            <div className="my-4  ">
              {" "}
              <p className="my-2 text-lg font-bold">Car Location</p>
              <hr className="my-3 " />
              <p className="my-2 text-md font-semibold">
                pincode :{hub?.pincode}
              </p>
              <StaticMapRoute
                latitude={hub?.location ? hub.location.latitude : 0}
                longitude={hub?.location ? hub.location.longitude : 0}
              />
            </div>
            <hr className="my-5 " />
            <p className="my-2 text-lg font-bold">edit</p>
            <hr className="my-3 " />
            <div
              className="font-medium  capitalize  flex  items-center hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {" "}
              click to edit :
             <img src="/edit.gif" className="h-10 w-10 ml-2" alt="" />
           
            </div>
            <hr className="my-5 " />
          </div>
        </div>
      </div>
      <div
        className="font-medium  flex capitalize"
        onClick={() => setOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16.5a2.25 2.25 0 0 1-2.25 2.25h-7.5v.75c0 .385.29.702.663.745L9 20.25h9.75a.75.75 0 0 0 .745-.663l.005-.087v-12a.75.75 0 0 0-.663-.745l-.087-.005H18v9.75zM15.75 3.75H6a.75.75 0 0 0-.745.663L5.25 4.5v12c0 .385.29.702.663.745L6 17.25h9.75a.75.75 0 0 0 .745-.663l.005-.087v-12a.75.75 0 0 0-.663-.745l-.087-.005zm-1.5 9.75a.75.75 0 0 1 .087 1.495L14.25 15H7.5a.75.75 0 0 1-.087-1.495L7.5 13.5h6.75zm0-3.75a.75.75 0 0 1 .087 1.495l-.087.005H7.5a.75.75 0 0 1-.087-1.495L7.5 9.75h6.75zm0-3.75a.75.75 0 0 1 .087 1.495l-.087.005H7.5a.75.75 0 0 1-.087-1.495L7.5 6h6.75zM6 18.75a2.25 2.25 0 0 1-2.25-2.25v-12A2.25 2.25 0 0 1 6 2.25h9.75A2.25 2.25 0 0 1 18 4.5v.75h.75A2.25 2.25 0 0 1 21 7.5v12a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v-.75H6z"
            fill="#10A310"
            fill-rule="evenodd"
          ></path>
        </svg>
        fair summary
        <Transition.Root show={open} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Deactivate account
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account?
                              All of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Deactivate
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};

export default VendorProfile;
