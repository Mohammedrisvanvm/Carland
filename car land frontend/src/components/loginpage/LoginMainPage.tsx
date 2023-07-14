import { ReactElement } from "react";

export const LoginMainPage = (): ReactElement => {
  return (
    <div className="relative  bg-opacity-75">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              The quick, brown fox
              <br className="hidden md:block" />
              jumps over{' '}
              <span className="inline-block text-purple-600">
                a lazy dog
              </span>
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudan, totam rem aperiam, eaque ipsa
              quae.
            </p>
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
            >
              Learn more 
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>
          <div className="px-5 pt-6 pb-5 text-center border border-gray-300 rounded lg:w-2/5">
            <div className="mb-5 font-semibold">Create an account</div>
            <div className="flex justify-center w-full mb-3">
              <button

                className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-black hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                <div className="flex items-center">
                  <div className="mr-3 font-semibold text-white">
                    Login with Google
                  </div>
                  <svg  viewBox="0 0 48 48" width="24px" height="24px">
  <path fill="#FFC107" d="M41.44,20.184c0-1.424-0.127-2.807-0.369-4.137H24v7.851h10.959c-0.455,2.563-2.024,4.725-4.464,5.877v4.878h7.218 C39.681,33.693,41.44,27.988,41.44,20.184z"/>
  <path fill="#FF3D00" d="M24,44.871c6.479,0,11.979-2.117,16.001-5.759l-7.718-6.033c-1.773,1.192-4.038,1.902-6.538,1.902 c-5.033,0-9.301-3.385-10.8-7.939H3.876v4.978C8.041,39.297,15.605,44.871,24,44.871z"/>
  <path fill="#4CAF50" d="M13.203,26.322c-0.325-0.966-0.498-2.002-0.498-3.078s0.173-2.112,0.498-3.078V14.18H3.876 C2.549,16.499,2,19.11,2,21.826s0.549,5.327,1.876,7.646L13.203,26.322z"/>
  <path fill="#1976D2" d="M24,8.129c2.867,0,5.46,1.019,7.507,2.688l5.605-5.605C35.977,2.565,30.479,0,24,0 C15.605,0,8.041,5.574,5.482,13.212l7.218,5.666C14.699,11.514,19.967,8.129,24,8.129z"/>
  <path fill="#FF6D00" d="M5.482,13.212L5.482,13.212l-2.876,3.697C2.223,17.843,2,19.305,2,20.826s0.223,2.983,0.606,4.118 l7.218-5.666C8.041,18.426,15.605,24,24,24v-4.129C19.967,19.871,14.699,16.486,5.482,13.212z"/>
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
            <a
              href="/"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
            >
              Sign Up with Email
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};