import { useFormik } from 'formik';
import React from 'react'
import { AdminAuthSchema } from '../../../validationSchemas/validationSchema';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";


interface MyFormValue {
    email: string;
    password: string;
  }
  const initialValues: MyFormValue = {
    email: "",
    password:"",
  };
const AdminLogin = () => {
    const Navigate = useNavigate();
const submitForm:any=async (values: {}, actions: any) => {
    try {
      console.log(values);

      await new Promise<void>((resolve, reject) => setTimeout(resolve, 1000));
      actions.resetForm();

      await adminAuth(values);
      Navigate("/admin/adminHome");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
}
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

  

  <div className="flex shadow-md">
   
    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{width: "24rem", height:" 32rem"}}>
      <div className="w-72">
       
        <h1 className="text-xl font-semibold">Welcome back Admin</h1>
        <small className="text-gray-400">Welcome back! Please enter your details</small>

       
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Email</label>
            <input type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            {errors.email && touched.email && (
                    <p className="border-red-500 text-red-500">
                      {errors.email}
                    </p>
                  )}
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Password</label>
            <input type="password" onBlur={handleBlur} value={values.password} placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-black focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
            {errors.password && touched.password && (
                    <p className="border-red-500 text-red-500">
                      {errors.email}
                    </p>
                  )}
          </div>


          <div className="mb-3">
            <button  disabled={isSubmitting} className="mb-1.5 block w-full text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md">Sign in</button>
          </div>
        </form>

      </div>
    </div>

   
    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{width: "24rem",height: "32rem"}}>
      <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" />
    </div>

  </div>

  </>
  )
}

export default AdminLogin
