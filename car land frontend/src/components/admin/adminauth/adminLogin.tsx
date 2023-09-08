import { useFormik } from "formik";
import React, { useEffect } from "react";
import { AdminAuthSchema } from "../../../validationSchemas/validationSchema";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { adminAuth } from "../../../services/apis/adminApi/adminApi";

import { useAppDispatch,useAppSelector } from "../../../redux/store/storeHook";
import { setAdmin } from "../../../redux/slice/adminSlice";




interface MyFormValue {
  email: string;
  password: string;
}
const initialValues: MyFormValue = {
  email: "",
  password: "",
};
interface axiosresponse{
  data:{
    admin:{
      userName:string|null,
      email:string|null,
      accessToken:string|null
      
    }
  }
}
const AdminLogin = () => {
    const dispatch=useAppDispatch()
  const Navigate = useNavigate();
  const admin=useAppSelector((state)=>state.admin)
  console.log(admin);
  useEffect(()=>{
    if(admin.accessToken){
      Navigate('/admin/adminHome')
    }
  }
  )
  const submitForm: any = async (values: {}, actions: any) => {
    try {
      console.log(values);
      await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm();
     const response:axiosresponse=await adminAuth(values)
     console.log(response.data.admin);
     
      setAdmin(response.data.admin)

      Navigate("/admin/adminHome");
    } catch (error: any) {
      console.log(error);
      
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
    validationSchema: AdminAuthSchema,
  });

  return (
    <>
      <div className="relative h-screen ">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 h-screen bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex items-center justify-end xl:flex-row">
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Admin Login
                  </h3>
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Enter your email"
                        className={`${
                            errors.email && touched.email ? "input-error" : ""
                          } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}                      />
                      {errors.email && touched.email && (
                        <p className="border-red-500 text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-xs font-semibold">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        placeholder="*****"
                        className={`${
                            errors.password && touched.password ? "input-error" : ""
                          } flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}                      />
                      {errors.password && touched.password && (
                        <p className="border-red-500 text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="mb-1.5 block w-full text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
