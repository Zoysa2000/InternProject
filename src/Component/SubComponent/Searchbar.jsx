import React, { useState } from "react";
import useDepartments from "./Department";

export default function Searchbar({ onResults }) {
    const [id, setId] = useState("");
    const [dept, setDept] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { departments, loading: deptLoading, error: deptError } = useDepartments();
    const activeDepartments = departments.filter(d => d.isActive);

    const handleSearch = () => {
        const trimmedId = id.trim();
        const hasId = trimmedId !== "";
        const hasDept = dept !== "";

        if (!hasId && !hasDept) {
            alert("Please enter an ID or select a department.");
            return;
        }

        setError("");
        setLoading(true);

        if (hasId && hasDept) {
            fetchByDeptAndId(dept, trimmedId);
        } else if (hasDept) {
            fetchDept(dept);
        } else if (hasId) {
            fetchId(trimmedId);
        }
    };

    const fetchDept = async (department) => {
        try {
            const res = await fetch(`https://localhost:7068/api/Employees/byDepartment/${department}`);
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            onResults(data);
        } catch (err) {
            setError(err.message);
            onResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchId = async (empId) => {
        try {
            const res = await fetch(`https://localhost:7068/api/Employees/${empId}`);
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            onResults(data ? [data] : []);
        } catch (err) {
            setError(err.message);
            onResults([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchByDeptAndId = async (department, empId) => {
        try {
            const res = await fetch(`https://localhost:7068/api/Employees/${department}/${empId}`);
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            onResults(data ? [data] : []);
        } catch (err) {
            setError(err.message || "Combined search failed");
            onResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mt-1">
            <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="block py-2 ps-10 text-sm border rounded-lg w-80 bg-gray-50"
                placeholder="Search using ID"
            />

            <select
                id="department"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                disabled={deptLoading || activeDepartments.length === 0}
                className="border rounded-lg py-2 px-3 text-sm bg-white"
            >
                <option value="">Select Department</option>
                {activeDepartments.map((d) => (
                    <option key={d.deptId} value={d.deptName}>
                        {d.deptName}
                    </option>
                ))}
            </select>

            <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-indigo-900 text-white px-4 py-2 rounded-md"
            >
                {loading ? "Searching…" : "Search"}
            </button>

            {(error || deptError) && (
                <span className="text-red-600 text-sm ml-2">
          Error: {error || deptError}
        </span>
            )}
        </div>
    );
}

