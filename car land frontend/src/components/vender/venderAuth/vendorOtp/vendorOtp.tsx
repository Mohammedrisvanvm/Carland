import { useState, ChangeEvent } from "react";
import { VendorOtpVerify } from "../../../../services/apis/vendorApi/venderApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { vendorLogin } from "../../../../redux/Slices/UserSlice/VenderSlice";

export const VendorOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch=useDispatch()
  const Navigate=useNavigate()

  const handleChange = async(): Promise<void> => {
try {
       
    await dispatch(vendorLogin(parseInt(otp)))
    Navigate('/vendor/vendorhome')
} catch (error) {
    
} 
  };
  return (
    <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
      <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
        <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
          OTP VERIFICATION
        </h3>
        <form>
          <div className="mb-1 sm:mb-2">
            <label
              htmlFor="firstName"
              className="inline-block mb-1 font-medium"
            >
              Otp
            </label>
            <input
              placeholder="eg:465465"
              required
              type="text"
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="Otp"
              value={otp}
              maxLength={6}
              name="Otp"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setOtp(e.target.value)
              }
            />
          </div>

          <div className="mt-4 mb-2 sm:mb-4">
            <button
              type="button"
              onClick={() => handleChange()}
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
            >
              Submit
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
