import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { userGoogleThunk } from "../../../redux/slice/userSlice";
import { useDispatch } from "react-redux";

export const GoogleAuth = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const authLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        await dispatch(userGoogleThunk(response));
        Navigate("/");
      } catch (error: any) {
        console.log(error);
      }
    },
    onError: (error:any) => {
      console.log(error);

      throw new Error("login failed");
    },
  });

  return (
    <>
      <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
        <div className="mb-5 font-semibold">Create an account</div>
        <div className="flex justify-center w-full mb-3">
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => authLogin()}
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          >
            <div className="flex items-center">
              <div className="mr-3 font-semibold text-white">
                Login with Google
              </div>
              <svg viewBox="0 0 48 48" width="24px" height="24px">
                <path
                  fill="#FFC107"
                  d="M41.44,20.184c0-1.424-0.127-2.807-0.369-4.137H24v7.851h10.959c-0.455,2.563-2.024,4.725-4.464,5.877v4.878h7.218 C39.681,33.693,41.44,27.988,41.44,20.184z"
                />
                <path
                  fill="#FF3D00"
                  d="M24,44.871c6.479,0,11.979-2.117,16.001-5.759l-7.718-6.033c-1.773,1.192-4.038,1.902-6.538,1.902 c-5.033,0-9.301-3.385-10.8-7.939H3.876v4.978C8.041,39.297,15.605,44.871,24,44.871z"
                />
                <path
                  fill="#4CAF50"
                  d="M13.203,26.322c-0.325-0.966-0.498-2.002-0.498-3.078s0.173-2.112,0.498-3.078V14.18H3.876 C2.549,16.499,2,19.11,2,21.826s0.549,5.327,1.876,7.646L13.203,26.322z"
                />
                <path
                  fill="#1976D2"
                  d="M24,8.129c2.867,0,5.46,1.019,7.507,2.688l5.605-5.605C35.977,2.565,30.479,0,24,0 C15.605,0,8.041,5.574,5.482,13.212l7.218,5.666C14.699,11.514,19.967,8.129,24,8.129z"
                />
                <path
                  fill="#FF6D00"
                  d="M5.482,13.212L5.482,13.212l-2.876,3.697C2.223,17.843,2,19.305,2,20.826s0.223,2.983,0.606,4.118 l7.218-5.666C8.041,18.426,15.605,24,24,24v-4.129C19.967,19.871,14.699,16.486,5.482,13.212z"
                />
              </svg>
            </div>
          </button>
        </div>
        <p className="max-w-md px-5 mb-3 text-xs text-gray-600 sm:text-sm md:mb-5">
          Sed ut unde omnis iste natus accusantium doloremque laudantium omnis
          iste.
        </p>
        <div className="flex items-center w-full mb-5">
          <hr className="flex-1 border-gray-300" />
          <div className="px-3 text-xs text-gray-500 sm:text-sm">or</div>
          <hr className="flex-1 border-gray-300" />
        </div>
        <button
          onClick={() => {
            Navigate("/userLogin");
          }}
          className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
        >
          Sign In with Email
        </button>
        {"      "}

        <button
          onClick={() => {
            Navigate("/userSignUp");
          }}
          className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
        >
          Sign Up with Email
        </button>
      </div>
    </>
  );
};
