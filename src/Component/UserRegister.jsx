import React from 'react';
import RegisterBtn from "./SubComponent/RegisterBtn";
import ModeBtn from "./SubComponent/ModeBtn";

const UserRegister = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            {/* Dark mode toggle button */}
            <ModeBtn />

            {/* Centered form wrapper */}
            <div className="flex items-center justify-center h-full px-4">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 sm:p-8">
                        {/* Logo and Heading */}
                        <div className="text-center">
                            <img
                                src="./logo.png"
                                alt="Company Logo"
                                className="mx-auto mb-4 w-25 h-20"
                            />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create User an Account
                            </h1>
                        </div>

                        <form className="space-y-4" action="#">
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                               focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                               focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                               focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50
                                                   focus:ring-3 focus:ring-blue-300 dark:bg-gray-700
                                                   dark:border-gray-600 dark:focus:ring-blue-600"
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                        I accept the{" "}
                                        <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <RegisterBtn />

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserRegister;
