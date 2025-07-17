import React, { useEffect, useState } from "react";
import EmployeeModal from "./EmployeeModal";
import Searchbar from "./SubComponent/Searchbar";

export default function UserTable() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;

    useEffect(() => {
        fetch("https://localhost:7068/api/Employees/getEmployee")
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Failed to fetch employees");
                }
                return res.json();
            })
            .then((data) => {
                setEmployees(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const handleView = (empId) => {
        setSelectedId(empId);
        setOpenModal(true);
    };

    // Pagination logic
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentEmployees = employees.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(employees.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <p className="p-4">Loading employees…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <>
            <div className="mt-5 shadow-md sm:rounded-lg">
                <Searchbar onResults={setEmployees} />

                {/* Table Header */}
                <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-white">
                            <tr>
                                <th className="p-4"></th>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Photo</th>
                                <th className="px-6 py-3">Employee Name</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Position</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Date of Join</th>
                                <th className="px-6 py-3">More Details</th>
                            </tr>
                        </thead>
                    </table>
                </div>

                {/* Table Body */}
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                        <tbody>
                            {currentEmployees.map((emp) => (
                                <tr
                                    key={emp.empId}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </td>
                                    <td className="px-6 py-4">{emp.empId}</td>
                                    <td className="px-6 py-4">
                                        {emp.imageUrl ? (
                                            <img
                                                src={emp.imageUrl}
                                                alt={`${emp.firstName} ${emp.lastName}`}
                                                className="object-cover w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-600" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                                        {emp.firstName} {emp.lastName}
                                    </td>
                                    <td className="px-6 py-4">{emp.department}</td>
                                    <td className="px-6 py-4">{emp.position}</td>
                                    <td className="px-6 py-4">{emp.email}</td>
                                    <td className="px-6 py-4">
                                        {new Date(emp.dateOfJoin).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            style={{ backgroundColor: "#16056B" }}
                                            className="text-white font-medium rounded-md text-sm px-4 py-1.5 transition"
                                            onClick={() => handleView(emp.empId)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {currentEmployees.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-4 text-center">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center p-5 space-x-2">
                    {/* Prev */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${
                            currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    >
                        « Prev
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-[#16056B] text-white"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${
                            currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    >
                        Next »
                    </button>
                </div>
            </div>

            <EmployeeModal
                open={openModal}
                empId={selectedId}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}





