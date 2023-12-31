import { FormikConfig, FormikHelpers, useFormik } from "formik";
import React,{ ChangeEvent, FC, SetStateAction } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HubAdd } from "../../../services/apis/vendorApi/vendorApi";
import { vendorHubSchema } from "../../../validationSchemas/validationSchema";
import VendorNavBar from "../vendorNavbar/vendorNavBar";
import { AxiosResponse } from "../../../interfaces/axiosinterface";
import MapboxComponent from "./Map";
import { hub } from "../../../interfaces/userAuth";
import Loader from "../../../utils/Loader";
import { GeocodingResponse } from "../../../interfaces/geocodingInterface";
import mapboxAPI from "../../../services/mapbox/mapbox";
import { convertToBase64 } from "../../../utils/convertToBase64";


type Current = {
  latitude: number;
  longitude: number;
};

const AddHub: FC = () => {
  const Navigate = useNavigate();
  const [showMap, setShowMap] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);
  const [location, setLocation] = React.useState<Current|null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const initialValues: hub = {
    hubName: "",
    pincode: "",
    hubImage: "",
    hubMultiImage: [],
    validityDate: "",
    license: "",
    placeName: '',
   
  };

  const submitForm = async (
    values: hub,
    actions: FormikHelpers<hub>
  ): Promise<void> => {
    try {
  
       
      if(location){

        values.placeName = searchQuery;
        values.location=location

        setLoader(!loader)
        const res: AxiosResponse = await HubAdd(values);
        setLoader(!loader)
        toast.success(res.data?.message);
        Navigate("/vendor");
    
      }else{
        toast.error('add location');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoader(!loader)
      console.log(error);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: submitForm,
    initialErrors: {},
    initialTouched: {},
    validateOnMount: true,
    validationSchema: vendorHubSchema,
  });

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      const files = e.target.files;
      if (files) {
        let filesArray: string[] = [];
        for (let i = 0; i < files.length; i++) {
          let Bse = await convertToBase64(files[i]);

          filesArray.push(Bse);
        }
        setFieldValue("hubMultiImage", filesArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlehubImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      if (e.target.files != null) {
        const file: File | null = e.target.files[0];
        const Base = await convertToBase64(file);
        setFieldValue("hubImage", Base);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlelicenseImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      if (e.target.files != null) {
        const file: File | null = e.target.files[0];
        const Base = await convertToBase64(file);
        setFieldValue("license", Base);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(()=>{
    const CurrentLocation=async()=>{
      const res: GeocodingResponse = await mapboxAPI.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location?.longitude},${location?.latitude}.json`
      ); 
      setSearchQuery(res.data.features[0].place_name);
    }
    CurrentLocation()
  },[location])
 
  return (
    <>
      {" "}
      <VendorNavBar sidebarWidth={false} spanVisible={false} setsidebarWidth={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } setSpanVisible={function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } />
      {loader ? <Loader/> :(<>
      <div className="flex justify-center overflow-x-auto shadow-md sm:rounded-lg mt-14 m-8 ">
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white my-8 flex justify-center">
          Add Hub
        </span>
      </div>
      <div className="flex justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  className={`${
                    errors.hubName && touched.hubName ? "input-error" : ""
                  } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=" "
                  value={values.hubName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="hubName"
                  required
                />
                {errors.hubName && touched.hubName && (
                  <p className="border-red-500 text-sm text-red-500">
                    {errors.hubName}
                  </p>
                )}
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  hub Name
                </label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="text-white bg-gray-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                  >
                    Location
                  </button>
                  {showMap && <MapboxComponent setLocation={setLocation} setShowMap={setShowMap}/>}
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="pincode"
                    id="floating_phone"
                    className={`${
                      errors.pincode && touched.pincode ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.pincode && touched.pincode && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.pincode}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    pincode
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="Date"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="validityDate"
                    id="floating_phone"
                    className={`${
                      errors.validityDate && touched.validityDate
                        ? "input-error"
                        : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.validityDate && touched.validityDate && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.validityDate}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Hub Validity Date
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="file"
                    name="license"
                    onChange={handlelicenseImageChange}
                    onBlur={handleBlur}
                    required
                  />

                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    license Image
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="file"
                    name="hubImage"
                    onChange={handlehubImageChange}
                    onBlur={handleBlur}
                    required
                  />

                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    hub Image
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                    name="hubMultiImages"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    id="multiple_files"
                    multiple
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6X">
                    mutiple image
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
      )}
    </>
  );
};

export default AddHub
