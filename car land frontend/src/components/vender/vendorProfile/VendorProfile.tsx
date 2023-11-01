import React, { FC, ChangeEvent } from "react";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import {
  updateProfileHub,
  vendorProfile,
} from "../../../services/apis/vendorApi/vendorApi";
import { hub } from "../../../interfaces/userAuth";
import StaticMapRoute from "../../user/profile/StaticMapRoute";

import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toastHelper } from "../../../utils/toastConfig";
import { convertToBase64 } from "../../../utils/convertToBase64";
import { ButtonLoader } from "../../../utils/Loader";
type Iprop = {
  sidebarWidth: boolean;
};
const VendorProfile: FC<Iprop> = ({ sidebarWidth }) => {
  const vendor = useAppSelector((state) => state.vendor);
  const cancelButtonRef = React.useRef(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [hub, setHub] = React.useState<hub | null>();
  const [license, setLicense] = React.useState<string | null>(null);
  const [imageMain, setImageMain] = React.useState<string | null>(null);
  const [imageSub, setImageSub] = React.useState<string | null>(null);
  const [validityDate, SetValidityDate] = React.useState<string | null>(null);
  console.log(license, imageMain, setImageSub);

  React.useEffect(() => {
    const fetchData = async () => {
      const res: AxiosResponse = await vendorProfile(vendor.hubId);
      console.log(res.data?.hub);
      if (res.data?.hub) {
        setHub(res.data.hub);
      }
    };
    fetchData();
  }, [open]);

  const hubValidityDate = hub?.validityDate
    ? new Date(hub.validityDate)
    : new Date();
  const today = new Date();
  const thirtyDaysAgo = new Date(today);

  thirtyDaysAgo.setDate(today.getDate() - 30);

  const minDate =
    today > hubValidityDate
      ? today.toISOString().split("T")[0]
      : thirtyDaysAgo.toISOString().split("T")[0];

  const updateProfile = async () => {
    console.log(license, imageMain, imageSub, validityDate);
    setLoader(true)
    try {
      const res: AxiosResponse = await updateProfileHub(
        license,
        imageMain,
        imageSub,
        validityDate,
        vendor.hubId
      );
      setLoader(false)
      setOpen(false);
      setImageMain(null);
      setImageSub(null);
      setLicense(null);
      SetValidityDate(null);
      toastHelper("success", `${res.data?.message}`);
    } catch (error: any) {
      console.log(error);
    }
  };
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
              <img src={hub?.hubImage} alt="" className="mr-2" />
              <img src={hub?.hubMultiImage[0]} alt=""  />
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
            className="relative  z-10"
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
              <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0  z-10 w-screen overflow-y-auto">
              <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative  w-screen transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Edit Profile
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="h-36 w-full  flex ">
                            <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imageMain ? (
                                  <span className="text-green-500">
                                    completed
                                  </span>
                                ) : (
                                  <>
                                    <svg
                                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      or drag and drop
                                    </p>
                                  </>
                                )}
                              </div>
                              <input
                                id="imageMain"
                                required
                                disabled={imageMain !== null}
                                type="file"
                                name="imageMain"
                                className="hidden"
                                onChange={async (
                                  e: ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const selectedImage = e.target.files[0];

                                    setImageMain(
                                      await convertToBase64(selectedImage)
                                    );
                                  }
                                }}
                              />
                            </label>

                            <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {imageSub ? (
                                  <span className="text-green-500">
                                    completed
                                  </span>
                                ) : (
                                  <>
                                    <svg
                                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{" "}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      or drag and drop
                                    </p>
                                  </>
                                )}
                              </div>
                              <input
                                id="imageSub"
                                required
                                type="file"
                                name="imageSub"
                                className="hidden"
                                disabled={imageSub !== null}
                                onChange={async (
                                  e: ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setImageSub(
                                      await convertToBase64(e.target.files[0])
                                    );
                                  }
                                }}
                              />
                            </label>
                          </div>
                          <div className="flex capitalize justify-around">
                            {" "}
                            <div> Main image</div>
                            <div> sub image</div>
                          </div>
                          <hr className="my-2" />
                          <label className="flex flex-col items-center justify-center w-full mx-3 my-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {license ? (
                                <span className="text-green-500">
                                  completed
                                </span>
                              ) : (
                                <>
                                  <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                  >
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                  </p>
                                </>
                              )}
                            </div>
                            <input
                              id="License"
                              required
                              type="file"
                              name="License"
                              className="hidden"
                              disabled={license !== null}
                              onChange={async (
                                e: ChangeEvent<HTMLInputElement>
                              ) => {
                                if (e.target.files && e.target.files[0]) {
                                  setLicense(
                                    await convertToBase64(e.target.files[0])
                                  );
                                }
                              }}
                            />
                          </label>
                          <p className="flex justify-center">License</p>
                          <hr />
                          <div className="flex items-center justify-center my-3">
                            {" "}
                            validityDate :{" "}
                            <div className="">
                              <input
                                type="date"
                                className="border-0 bg-transparent text-green-500"
                                min={minDate}
                                onChange={(
                                  e: ChangeEvent<HTMLInputElement>
                                ) => {
                                  SetValidityDate(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      {loader ? (
                        <ButtonLoader content="uploading..."/>
                      ) : (
                        <>
                          {" "}
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                            onClick={() => {
                              updateProfile();
                            }}
                          >
                            upload
                          </button>
                        </>
                      )}

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
