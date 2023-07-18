import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { LoginSchema } from "../../../validationSchemas/validationSchema";
import "./signIn.css";
import { userLogin } from "../../../services/apis/userApi/userApi";
import { toast } from "react-toastify";

interface MyFormValue {
  userName: string;
  email: string;
  password: string;
}
const initialValues: MyFormValue = {
  userName: "",
  email: "",
  password: "",
};

export const SignIn = () => {
  const Navigate = useNavigate();
  const submitForm: any = async (values: {}, actions: any) => {
   
    
    try {
      const res: any = await userLogin(values);
      console.log(res);
      if (res.data.error){
        toast.error(res.data.message)
      }
        await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm();
    } catch (error:any) {
      console.log(error);
      
      toast.error(error.response.data.message)
      //   actions.setErrors(error)
      // console.log(actions);
    }

    console.log("submitted");

    // Navigate('/UserOtp');
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
    validationSchema: LoginSchema,
  });
  console.log(errors.email, errors.password, errors.userName);

  return (
    <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
      <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
        <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="userName" className="inline-block mb-1 font-medium">
              User Name
            </label>
            <input
              placeholder="John"
              required
              type="text"
              value={values.userName}
              className={`${
                errors.userName && touched.userName ? "input-error" : ""
              } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
              id="userName"
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
              <p className="border-red-500 text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="password" className="inline-block mb-1 font-medium">
              Password
            </label>
            <input
              placeholder="********"
              required
              type="password"
              value={values.password}
              className={`${
                errors.password && touched.password ? "input-error" : ""
              } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="border-red-500 text-red-500">{errors.password}</p>
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
          <p className="text-xs text-gray-600 sm:text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
};
