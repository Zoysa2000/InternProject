import React from 'react';

const UpdateUser = () => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <div className="">
                <label htmlFor="table-search" className="sr-only">Search</label>

                {/* Flex Container for Search + Dropdown */}
                <div className="flex flex-wrap items-center gap-4 mt-1">
                    {/* Search Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block py-2 pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search using ID"
                        />
                    </div>

                    {/* Dropdown Filter */}
                    <div>
                        <select
                            className="block w-48 py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 "
                            defaultValue=""
                        >
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Finance">Finance</option>
                            <option value="IT Support">IT Support</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Logistics">Logistics</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table remains unchanged */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark-gray-700 dark:text-gray-700">
                <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="px-6 py-3">Employee Name</th>
                    <th scope="col" className="px-6 py-3">Employee ID</th>
                    <th scope="col" className="px-6 py-3">Department</th>
                    <th scope="col" className="px-6 py-3">Position</th>
                    <th scope="col" className="px-6 py-3">More Details</th>
                </tr>
                </thead>
                <tbody>
                {[
                    {name: "Tharindu Perera", id: "EMP001", dept: "Engineering", detail: "Software Engineer"},
                    {name: "Dilani Fernando", id: "EMP002", dept: "HR", detail: "HR Manager"},
                    {name: "Ruwan Silva", id: "EMP003", dept: "Sales", detail: "Senior Sales Executive"},
                    {name: "Nimesha Jayasuriya", id: "EMP004", dept: "Finance", detail: "Accountant"},
                    {name: "Kasun Wijesinghe", id: "EMP005", dept: "IT Support", detail: "System Administrator"},
                    {name: "Sajini Ratnayake", id: "EMP006", dept: "Marketing", detail: "Marketing Specialist"},
                    {name: "Ishan Madushanka", id: "EMP007", dept: "Logistics", detail: "Logistics Coordinator"},
                ].map((emp, i) => (
                    <tr key={i}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="w-4 p-4">
                            <input type="checkbox"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                        </td>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{emp.name}</th>
                        <td className="px-6 py-4">{emp.id}</td>
                        <td className="px-6 py-4">{emp.dept}</td>
                        <td className="px-6 py-4">{emp.detail}</td>
                        <td className="px-6 py-4">
                            <button style={{backgroundColor: "#008000"}}
                                    className="text-white font-medium rounded-md text-sm px-4 py-1.5 transition">
                               Update
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UpdateUser;