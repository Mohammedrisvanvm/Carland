import { ReactElement } from "react";

export const Banner = ():ReactElement  => {
  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white border rounded shadow-sm lg:flex-row sm:mx-auto">
      <div className="relative lg:w-1/2">
        <img
          src="/istockphoto-1157127178-612x612.jpg"
          alt=""
          className="object-cover w-full lg:absolute h-80 lg:h-full"
        />
        <svg
          className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
          viewBox="0 0 20 104"
          fill="currentColor"
        >
          <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
        </svg>
      </div>
      <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
            Brand new
          </p>
        </div>
        <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
        ensuring your safety and satisfaction at every step.
        </h5>
        <p className="mb-5 text-gray-800">
          <span className="font-bold">Car Land,</span>  we are committed to providing exceptional car rental
              and cab services to our customers. With a diverse fleet of
              vehicles and a team of experienced drivers, we aim to make your
              travel experience comfortable and convenient. 
        </p>
        <div className="flex items-center">
          <button
            type="submit"
            onClick={scrollDown}
            className="inline-flex items-center bg-black justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
          >
            Get started
          </button>
          <button
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn More
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
    return (
      <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <img
            className="object-cover w-full h-48 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-84 lg:h-96"
            src="/69822571.png"
            alt=""
          />


        </div>
        <div className="relative flex flex-col items-start w-full  max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              Brand new
            </p>
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Everything you
              <br className="hidden md:block" />
              can imagine{' '}
              <span className="inline-block text-deep-purple-accent-400">
                is real
              </span>
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
            we are committed to providing exceptional car rental
              and cab services to our customers. With a diverse fleet of
              vehicles and a team of experienced drivers, we aim to make your
              travel experience comfortable and convenient. 
            </p>
            <div className="flex items-center">
              <button
                onClick={scrollDown}
                className="inline-flex items-center bg-black justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </button>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };