import React, { useEffect, useState } from "react";
import EmployeeModal from "./EmployeeModal";

export default function UserTable() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [openModal, setOpenModal] = useState(false);

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

    if (loading) return <p className="p-4">Loading employees…</p>;
    if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

    return (
        <>
            <div className="shadow-md sm:rounded-lg mt-5">
                {/* Table header */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

                {/* Table body (scrollable) */}
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                        {employees.map((emp) => (
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
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />
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

                        {employees.length === 0 && (
                            <tr>
                                <td colSpan={9} className="text-center py-4">
                                    No employees found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
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




