import React, { useState } from "react";

export default function Searchbar({ onResults }) {
    const [id, setId] = useState("");
    const [dept, setDept] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="block w-48 py-2 px-3 text-sm border rounded-lg bg-white"
            >
                <option value="">All Departments</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
            </select>

            <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-indigo-900 text-white px-4 py-2 rounded-md"
            >
                {loading ? "Searching…" : "Search"}
            </button>

            {error && (
                <span className="text-red-600 text-sm ml-2">Error: {error}</span>
            )}
        </div>
    );
}

