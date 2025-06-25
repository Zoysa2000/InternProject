import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function AddUser() {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
            <form
                className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-center mb-3 text-gray-900 dark:text-white">
                    Employee Information
                </h1>
                {/* Profile Picture */}
                <div className="flex items-center space-x-4 mb-6">
                    <div className="shrink-0">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Selected"
                                className="h-16 w-16 rounded-full object-cover border border-gray-400"
                            />
                        ) : (
                            <UserCircleIcon className="h-16 w-16 text-gray-400 dark:text-gray-600"/>
                        )}
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </label>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="first_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                            name</label>
                        <input type="text" id="first_name" placeholder="John" required className={inputStyle}/>
                    </div>
                    <div>
                        <label htmlFor="last_name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                            name</label>
                        <input type="text" id="last_name" placeholder="Doe" required className={inputStyle}/>
                    </div>
                    <div>
                        <label
                            htmlFor="department"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Department
                        </label>
                        <select
                            id="department"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select department
                            </option>
                            <option value="Engineering">IT</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="IT Suport">Marketing</option>
                            <option value="Logistic">Logistic</option>
                            {/* add more options as needed */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                            number</label>
                        <input type="tel" id="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                               required className={inputStyle}/>
                    </div>
                    <div>
                        <label htmlFor="position"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                        <input type="text" id="position" placeholder="Manager" required className={inputStyle}/>
                    </div>
                    <div>
                        <label htmlFor="age"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input type="number" id="age" placeholder="30" required className={inputStyle}/>
                    </div>
                </div>

                {/* Email + DOB */}
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email
                            address</label>
                        <input type="email" id="email" placeholder="john.doe@example.com" required
                               className={inputStyle}/>
                    </div>
                    <div>
                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date
                            of Join</label>
                        <input type="date" id="dob" required className={inputStyle}/>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" required
                               className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-3 focus:ring-blue-300"/>
                    </div>
                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-white">
                        I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
                    </label>
                </div>

                {/* Submit Button */}
                <button type="submit"
                        className="text-white bg-[#16056B] hover:bg-[#10034d] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Add Employee
                </button>
            </form>
        </div>
    );
}

// Tailwind input styles with dark mode support
const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg \
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 \
dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white \
dark:focus:ring-blue-500 dark:focus:border-blue-500";
