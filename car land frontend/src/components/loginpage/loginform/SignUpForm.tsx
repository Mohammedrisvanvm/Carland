import { ReactElement } from 'react'

export const SignUp = (): ReactElement => {
    return (
        <>
        
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                        Sign Up
                    </h3>
                    <form>
                        <div className="mb-1 sm:mb-2">
                            <label
                                htmlFor="firstName"
                                className="inline-block mb-1 font-medium"
                            >
                                User Name
                            </label>
                            <input
                                placeholder="John"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                id="firstName"
                                name="firstName"
                            />
                        </div>
                     
                        <div className="mb-1 sm:mb-2">
                            <label
                                htmlFor="email"
                                className="inline-block mb-1 font-medium"
                            >
                                E-mail
                            </label>
                            <input
                                placeholder="john.doe@example.org"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                            />
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
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                id="Password"
                                name="Password"
                            />
                        </div>
                        <div className="mb-1 sm:mb-2">
                            <label
                                htmlFor="Password"
                                className="inline-block mb-1 font-medium"
                            >
                                Confirm Password
                            </label>
                            <input
                                  placeholder="********"
                                required
                                type="text"
                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                id="Password"
                                name="Password"
                            />
                        </div>
                        <div className="mt-4 mb-2 sm:mb-4">
                            {/* <button
                                type="submit"
                                className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold transition duration-200 bg-white border border-gray-300 rounded md:w-auto hover:bg-gray-100 focus:shadow-outline focus:outline-none"
                            >
                                Login
                            </button> */}
                            <button
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
    )
}


