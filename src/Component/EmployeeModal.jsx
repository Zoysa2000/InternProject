import React, { useEffect, useState } from "react";

export default function EmployeeModal({ open, onClose, empId }) {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState("");

    // fetch the employee only when the modal is opened and the ID changes
    useEffect(() => {
        if (!open || !empId) return;

        setLoading(true);
        fetch(`https://localhost:7068/api/Employees/${empId}`)
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Failed to fetch employee");
                }
                return res.json();
            })
            .then((data) => {
                setEmployee(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [open, empId]);

    if (!open) return null;

    // simple loading & error overlays
    if (loading)
        return (
            <Backdrop>
                <div className="text-white text-lg">Loading…</div>
            </Backdrop>
        );

    if (error)
        return (
            <Backdrop>
                <div className="text-red-300">
                    Error: {error}
                    <button className="ml-4 underline" onClick={onClose}>
                        close
                    </button>
                </div>
            </Backdrop>
        );

    return (
        <Backdrop>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md animate-fade-in scale-95 transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Employee ID – {employee.empId} {/* show ID here if you like */}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5 text-gray-700 dark:text-gray-200">
                    {/* Photo */}
                    <div className="flex justify-center">
                        {employee.imageUrl ? (
                            <img
                                src={employee.imageUrl}
                                alt="Employee"
                                className="h-28 w-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-md"
                            />
                        ) : (
                            <div className="h-28 w-28 rounded-full bg-gray-300 dark:bg-gray-700" />
                        )}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <Detail label="First Name" value={employee.firstName} />
                        <Detail label="Last Name" value={employee.lastName} />
                        <Detail label="Department" value={employee.department} />
                        <Detail label="Position" value={employee.position} />
                        <Detail label="Phone" value={employee.phone} />
                        <Detail label="Age" value={employee.age} />
                        <Detail label="Email" value={employee.email} />
                        <Detail
                            label="Date of Join"
                            value={new Date(employee.dateOfJoin).toLocaleDateString()}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Backdrop>
    );
}

// small helpers
const Backdrop = ({ children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        {children}
    </div>
);

const Detail = ({ label, value }) => (
    <div>
        <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
            {label}
        </div>
        <div className="text-sm font-medium">{value || "-"}</div>
    </div>
);

