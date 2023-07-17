import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { LoginSchema } from "../../../validationSchemas/validationSchema";

interface MyFormValues{
  userName:string,
  email:string,
  password:string
}
const initialValues:MyFormValues={
  userName:'',
  email:'',
  password:''
}

export const SignIn = () => {

  const onSubmit:any = (values: {}, actions: any) => {
    console.log(values);
    console.log(actions);


    //     await new Promise<void>((resolve, reject) => setTimeout(resolve,1000))
    //    actions.resetform()
    console.log("submitted");

    Navigate('/UserOtp');
};

  const {handleChange,handleBlur,values,errors}=useFormik({
    initialValues,
    onSubmit,
    initialErrors:{},
    validateOnMount:true,
    validationSchema:LoginSchema
  })
  console.log(values,errors);
  
  const Navigate=useNavigate()
    return (
 
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Login
                  </h3>
                  <form>
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
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="userName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="userName"
                      />
                    {errors.userName  && <p className="border-red-500 text-red-500">{errors.userName}</p>}

                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="Email"
                        className="inline-block mb-1 font-medium"
                      >
                       Email
                      </label>
                      <input
                         placeholder="john.doe@example.org"
                         required
                         type="text"
                         className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                         id="email"
                         name="email"
                         onChange={handleChange}
                         onBlur={handleBlur}
                      />
                    {errors.email  && <p className="border-red-500 text-red-500">{errors.email}</p>}

                    </div>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="password"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                      placeholder="********"
                        required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    {errors.password  && <p className="border-red-500 text-red-500">{errors.password}</p>}

                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                  
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