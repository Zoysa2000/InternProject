import React, { useState } from "react";
import Searchbar from "./SubComponent/Searchbar";
import Updateform from "./Updateform";

export default function UpdateUser() {
    const [employees, setEmployees] = useState([]);
    const [showUpdateModel, setshowUpdateModel] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // this holds empId
    const [action, setAction]           = useState("");
    const [department,setDepartment]= useState("")

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
            <Updateform
                open={showUpdateModel}
                onClose={() => setshowUpdateModel(false)}
                employee={selectedEmployee}
                action = {action}
                department={department}
            />

            <Searchbar onResults={setEmployees} />

            <table className="w-full text-sm text-left mt-5">
                <thead className="text-xs uppercase bg-gray-300">
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

                <tbody>
                {employees.length === 0 ? (
                    <tr>
                        <td colSpan={9} className="text-center py-4">
                            No data found
                        </td>
                    </tr>
                ) : (
                    employees.map((emp) => (
                        <tr key={emp.empId} className="bg-white border-b hover:bg-gray-50">
                            <td className="p-4">
                                <input type="checkbox" className="w-4 h-4" />
                            </td>
                            <td className="px-6 py-4">{emp.empId}</td>
                            <td className="px-6 py-4">
                                <img
                                    src={emp.imageUrl}
                                    alt={emp.firstName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="px-6 py-4 ">
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
                                    className="bg-red-600 text-white rounded-md text-sm px-4 py-1.5"
                                    onClick={() => {
                                        setSelectedEmployee(emp.empId); // set empId to pass
                                        setshowUpdateModel(true);
                                        setAction("delete")
                                        setDepartment((emp.department))
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}