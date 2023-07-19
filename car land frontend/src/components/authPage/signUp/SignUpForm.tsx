import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { SignupSchema } from "../../../validationSchemas/validationSchema";
import "./SignUpForm.css";

import { userSignUp } from "../../../services/apis/userApi/userApi";
import { toast } from "react-toastify";

interface MyFormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: MyFormValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUp = () => {
  const Navigate = useNavigate();

  const submitForm: any = async (values: {}, actions: any) => {
 try {
  const res: any = await userSignUp(values);
    await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
    actions.resetForm();
    Navigate("/UserOtp");
  
 } catch (error:any) {
  toast.error(error.response.data.message);
  
 }

   
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
    validationSchema: SignupSchema,
  });
  // Navigate('/UserOtp')
  console.log(values);

  return (
    <>
      <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
        <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
          <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
            Sign Up
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="userName"
                className="inline-block mb-1 font-medium"
              >
                User Name
              </label>
              <input
                placeholder="John"
                required
                type="text"
                className={`${
                  errors.userName && touched.userName ? "input-error" : ""
                } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                id="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                name="userName"
              />
              {errors.userName && touched.userName && (
                <p className="border-red-500 text-red-500">{errors.userName}</p>
              )}
            </div>

            <div className="mb-1 sm:mb-2">
              <label htmlFor="email" className="inline-block mb-1 font-medium">
                E-mail
              </label>
              <input
                placeholder="john.doe@example.org"
                required
                type="text"
                className={`${
                  errors.email && touched.email ? "input-error" : ""
                } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
              />
              {errors.email && touched.email && (
                <p className="border-red-500 text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="Password"
                className="inline-block mb-1 font-medium"
              >
                Password
              </label>
              <input
                placeholder="********"
                required
                type="password"
                className={`${
                  errors.password && touched.password ? "input-error" : ""
                } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
              />
              {errors.password && touched.password && (
                <p className="border-red-500 text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="mb-1 sm:mb-2">
              <label
                htmlFor="confirmPassword"
                className="inline-block mb-1 font-medium"
              >
                Confirm Password
              </label>
              <input
                placeholder="********"
                required
                type="password"
                className={`${
                  errors.confirmPassword && touched.confirmPassword
                    ? "input-error"
                    : ""
                } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="confirmPassword"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="border-red-500 text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <div className="mt-4 mb-2 sm:mb-4">
              {/* <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
                            >
                                Login
                            </button> */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="inline-flex items-center justify-center w-full h-12 px-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Sign Up
              </button>
            </div>
            <p className="text-xs text-gray-600 sm:text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
