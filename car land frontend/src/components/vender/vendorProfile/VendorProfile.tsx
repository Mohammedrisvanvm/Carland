import React, { FC } from "react";
import { useAppSelector } from "../../../redux/store/storeHook";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import { vendorProfile } from "../../../services/apis/vendorApi/vendorApi";
import { hub } from "../../../interfaces/userAuth";
import StaticMapRoute from "../../user/profile/StaticMapRoute";
type Iprop = {
  sidebarWidth: boolean;
};
const VendorProfile: FC<Iprop> = ({ sidebarWidth }) => {
  const vendor = useAppSelector((state) => state.vendor);

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
  return (
    <>
      <div
        className={` ${
          sidebarWidth ? " ml-64 text-left " : " text-center ml-16 pt-2"
        } bg-gray-100 px-6 fixed capitalize transition-all duration-200 ease-in-out h-full overflow-y-scroll  w-5/6`}
      >
        <div className="flex  justify-center   p-10">
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
            <div className="text-red-500 text-lg">
              Validity Date:{" "}
              {hub?.validityDate
                ? new Date(hub.validityDate).toDateString()
                : "N/A"}
            </div>

            <hr className="my-1 " />
            <div className="my-4  ">
              {" "}
              <p className="my-2 text-lg font-bold">Car Location</p>
              <hr className="my-3 " />
              <p className="my-2 text-md font-semibold">pincode :{hub?.pincode}</p>
              <StaticMapRoute
                latitude={hub?.location ? hub.location.latitude : 0}
                longitude={hub?.location ? hub.location.longitude : 0}
              />
            </div>
            <hr className="my-5 " />
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
