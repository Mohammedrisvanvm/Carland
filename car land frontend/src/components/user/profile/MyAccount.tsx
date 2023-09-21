import React from 'react'

const MyAccount = () => {
  return (
    <div className="justify-between sm:mt-5">
    <h5 className="sm:m-16 m-10 text-xl text-center font-bold leading-none sm:text-2xl">
      MY Account
    </h5>
    <div className="">
      <form
        action="
    "
        className="text-center"
      >
        <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
          Account Details
        </h5>
        <hr className="mb-4 mx-6" />
        <div className="mb-1 sm:mb-2">
          <label
            htmlFor="email"
            className="inline-block mb-1 font-medium"
          >
            Email :
          </label>{" "}
          risvanrishuguest0000@gmail.com
        </div>
        <div className="mb-1 sm:mb-2">
          <label
            htmlFor="email"
            className="inline-block  mb-1 font-medium"
          >
            phone Number :
          </label>{" "}
          <input
            placeholder="phone number"
            required
            type="tel"
            className="flex-grow text-center h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            name="number"
          />
        </div>
        <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
          Personal Details
        </h5>
        <hr className="mb-4 mx-6" />
        <div className="mb-1 sm:mb-2">
          <label
            htmlFor="email"
            className="inline-block mb-1 font-medium"
          >
            User Name :
          </label>{" "}
          <input
            placeholder="Name"
            required
            type="text"
            className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            name="name"
          />
        </div>
        <div className="mb-1 sm:mb-2">
          <label
            htmlFor="email"
            className="inline-block mb-1 font-medium"
          >
            gender :
          </label>{" "}
          <select className="flex-grow text-center  h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline">
            <option selected>Choose a gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <hr className="mb-4 mx-6" />
        <div className="m-4">
          <button className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default MyAccount
