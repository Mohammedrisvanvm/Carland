import {  FormikHelpers, useFormik } from "formik";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router";
import { AddCarSchema } from "../../../../validationSchemas/validationSchema";
import { toast } from "react-toastify";
import { CarAdd } from "../../../../services/apis/vendorApi/vendorApi";
import { AxiosResponse } from "../../../../interfaces/axiosinterface";
import { useAppSelector } from "../../../../redux/store/storeHook";
;
import Loader from "../../../../utils/Loader";

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error: any) => {
      reject(error);
    };
  });
};
const AddCar = () => {
  const hubid = useAppSelector((state) => state.vendor.hubId);
  const Navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);


  const initialValues: IAddcar = {
    vehicleName: "",
    vehicleNumber: "",
    colour: "",
    year: "",
    fuel: "",
    numofseats: "",
    hubName: "",
    mileage: "",
    fairPrice: "",
    fairKm: "",
    vehiclesingleimage: "",
    vehiclemultipleimage: [],
    specification: [],
    vehicleValidityDate: "",
    DocumentVehicle: "",
  };
  const submitForm = async (
    values: IAddcar,
    actions: FormikHelpers<IAddcar>
  ): Promise<void> => {
    try {
      setLoader(!loader)
      const res: AxiosResponse = await CarAdd(values, hubid);
      setLoader(!loader)
      toast.success(res.data?.message);
      Navigate("/vendor/vendorcars");
    } catch (error: any) {
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
    validationSchema: AddCarSchema,
  });
  const handleDocumentVehicleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      if (e.target.files != null) {
        const file: File | null = e.target.files[0];
        const Base = await convertToBase64(file);
        setFieldValue("DocumentVehicle", Base);
      }
    } catch (error:any) {
      console.log(error);
    }
  };
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
        setFieldValue("vehiclemultipleimage", filesArray);
      }
    } catch (error) {
      console.log(error);
    }
  };
const [spec,setspec]=useState<string[]>([])
  const handleChangeSpec = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try { 
      setFieldValue("specification", spec);
    } catch (error) {
      console.log(error);
    }
  };
  const handlesingleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    try {
      if (e.target.files != null) {
        const file: File | null = e.target.files[0];
        const Base = await convertToBase64(file);
        setFieldValue("vehiclesingleimage", Base);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {" "}
      {loader ? <Loader/> :(<>
      <div className="flex justify-center overflow-hidden shadow-md sm:rounded-lg mt-14 m-8 ">
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white my-8 flex justify-center">
          Add Car
        </span>
      </div>
      <div className="flex justify-center">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    className={`${
                      errors.vehicleName && touched.vehicleName
                        ? "input-error"
                        : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    value={values.vehicleName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="vehicleName"
                    required
                  />
                  {errors.vehicleName && touched.vehicleName && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.vehicleName}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    vehicle Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="year"
                    id="floating_company"
                    className={`${
                      errors.year && touched.year ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=""
                    required
                  />
                  {errors.year && touched.year && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.year}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    year
                  </label>
                </div>
              </div>
              <img
                src={values.vehiclesingleimage ? values.vehiclesingleimage : ""}
                alt=""
              />
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  value={values.vehicleNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="vehicleNumber"
                  id="floating_repeat_password"
                  className={`${
                    errors.vehicleNumber && touched.vehicleNumber
                      ? "input-error"
                      : ""
                  } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=" "
                  required
                />
                {errors.vehicleNumber && touched.vehicleNumber && (
                  <p className="border-red-500 text-sm text-red-500">
                    {errors.vehicleNumber}
                  </p>
                )}
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  vehicle Number
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={values.colour}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="colour"
                    id="floating_first_name"
                    className={`${
                      errors.colour && touched.colour ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />{" "}
                  {errors.colour && touched.colour && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.colour}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    colour
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    id="fuel"
                    value={values.fuel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a fuel</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                  </select>

                  {errors.fuel && touched.fuel && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.fuel}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    fuel
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    value={values.numofseats}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="numofseats"
                    id="floating_phone"
                    className={`${
                      errors.numofseats && touched.numofseats
                        ? "input-error"
                        : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.numofseats && touched.numofseats && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.numofseats}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    numofseats
                  </label>
                </div>
                {/* <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    value={values.hubName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="hubName"
                    id="floating_company"
                    className={`${
                      errors.hubName && touched.hubName ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    hubName
                  </label>
                </div> */}
                <div className="relative z-0 w-full mb-6 group">
                
                  <input
                    type="text"
                    onChange={handleChangeSpec}
                    onBlur={handleBlur}
                    
                    name="specification"
                    id="specification"
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent the default behavior of the "Enter" key
                        const enteredValue = e.currentTarget.value;
                        setspec((previous)=>[...previous,enteredValue])
                        e.currentTarget.value = "";
                      }
                    }}
                    className={`${
                      errors.specification && touched.specification
                        ? "input-error"
                        : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=""
                   
                  />
                  {errors.specification && touched.specification && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.specification}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    specification
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    value={values.mileage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="mileage"
                    id="floating_phone"
                    className={`${
                      errors.mileage && touched.mileage ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.mileage && touched.mileage && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.mileage}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    mileage
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    value={values.fairPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="fairPrice"
                    id="floating_company"
                    className={`${
                      errors.fairPrice && touched.fairPrice ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.fairPrice && touched.fairPrice && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.fairPrice}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    fairPrice
                  </label>
                </div>
              </div>{" "}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    value={values.fairKm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="fairKm"
                    id="floating_phone"
                    className={`${
                      errors.fairKm && touched.fairKm ? "input-error" : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.fairKm && touched.fairKm && (
                    <p className="border-red-500 text-sm text-red-500">
                      {errors.fairKm}
                    </p>
                  )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    fairKm
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="Date"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={values.vehicleValidityDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="vehicleValidityDate"
                    id="floating_phone"
                    className={`${
                      errors.vehicleValidityDate && touched.vehicleValidityDate
                        ? "input-error"
                        : ""
                    } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                    placeholder=" "
                    required
                  />
                  {errors.vehicleValidityDate &&
                    touched.vehicleValidityDate && (
                      <p className="border-red-500 text-sm text-red-500">
                        {errors.vehicleValidityDate}
                      </p>
                    )}
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    vehicle Validity Date
                  </label>
                </div>
              </div>{" "}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="file"
                    name="DocumentVehicle"
                    onChange={handleDocumentVehicleChange}
                    onBlur={handleBlur}
                  />

                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Vehicle Rc
                  </label>
                </div> <div className="relative z-0 w-full mb-6 group">
                {values.specification ? (
                    <div>{values.specification}</div>
                  ) : null}
                  </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="file"
                    name="vehiclesingleimage"
                    onChange={handlesingleImageChange}
                    onBlur={handleBlur}
                  />

                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    vehicle Image
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                    name="vehiclemultipleimage"
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
      </>)}
    </>
  );
};

export default AddCar;
