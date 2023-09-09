import React, { useEffect } from "react";
import { vendorLoginSchema } from "../../../../validationSchemas/validationSchema";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { VendorAuthLogin } from "../../../../services/apis/vendorApi/vendorApi";
import { useAppSelector } from "../../../../redux/store/storeHook";
interface MyFormValue {
  userName?: string;
  email: string;
  number: number;
}
const initialValues: MyFormValue = {
  email: "",
  number: 0,
}; 

const VenderLogin = () => {
  const Navigate = useNavigate();
  const { vendor } = useAppSelector((state) => state);
  useEffect(() => {
    if (vendor.email) {
      Navigate("/vendor/vendorhome");
    }
  },[]);

  const submitForm: any = async (values: {}, actions: any) => {
    try {
      console.log(values);

      await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm();

      await VendorAuthLogin(values);
      Navigate("/vendor/otp");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    console.log("submitted");

    //  Navigate('/UserOtp');
  };
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues,
    onSubmit: submitForm,
    initialErrors: {},
    initialTouched: {},
    validateOnMount: true,
    validationSchema: vendorLoginSchema,
  });
  return (
    <>
      {" "}
      <div className="sm:ml-64">
        <div className="flex justify-end">
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="bg-white rounded shadow-2xl p-7 sm:p-10 ">
              {" "}
              <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                vender Login
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="email"
                    className="inline-block mb-1 font-medium"
                  >
                    Email
                  </label>
                  <input
                    placeholder="john.doe@example.org"
                    required
                    type="email"
                    value={values.email}
                    className={`${
                      errors.email && touched.email ? "input-error" : ""
                    } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="border-red-500 text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-1 sm:mb-2">
                  <label
                    htmlFor="number"
                    className="inline-block mb-1 font-medium"
                  >
                    phone Number
                  </label>
                  <input
                    placeholder="1234567890"
                    required
                    type="tel"
                    value={values.number}
                    className={`${
                      errors.number && touched.number ? "input-error" : ""
                    } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                    id="number"
                    name="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.number && touched.number && (
                    <p className="border-red-500 text-red-500">
                      {errors.number}
                    </p>
                  )}
                </div>
                <div className="mt-4 mb-2 sm:mb-4">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="flex justify-center text-xs text-gray-600 sm:text-sm">
                <button onClick={() => Navigate("/vendor/signup")}>
                  Sign UP
                </button>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 sm:text-sm mt-6">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenderLogin;
