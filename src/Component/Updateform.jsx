import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import useDepartments from "./SubComponent/Department";

const inputFieldClass =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg " +
    "focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " +
    "dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white";

export default function Updateform({ open = true, onClose = () => {}, employee, action,department }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        department: "",
        phone: "",
        position: "",
        age: "",
        email: "",
        dateOfJoin: "",
        imageUrl: "",
    });

        const { departments, loading: deptLoading, error: deptError } = useDepartments(); // custom hook
    const activeDepartments = departments.filter(d => d.isActive);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {
        if (!open || !employee) return;

        setLoading(true);
        setError("");
        fetch(`https://localhost:7068/api/Employees/getEmployeeDetails/${employee}`)
            .then((r) => (r.ok ? r.json() : Promise.reject("Unable to fetch employee")))
            .then((data) => {
                setFormData({
                    firstName: data.firstName ?? "",
                    lastName: data.lastName ?? "",
                    department: data.department ?? "",
                    phone: data.phone ?? "",
                    position: data.position ?? "",
                    age: data.age?.toString() ?? "",
                    email: data.email ?? "",
                    dateOfJoin: data.dateOfJoin?.slice(0, 10) ?? "",
                    imageUrl: data.imageUrl ?? "",
                });
                setImagePreview(data.imageUrl ?? null);
            })
            .catch((err) => setError(err.toString()))
            .finally(() => setLoading(false));
    }, [open, employee]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((p) => ({ ...p, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl; // keep existing photo by default

            // 1⃣  If user picked a **new** photo, upload it first
            if (imageFile) {
                const formImg = new FormData();
                formImg.append("image", imageFile);

                const upRes = await fetch(
                    "https://localhost:7068/api/Employees/uploadNewImage",
                    { method: "POST", body: formImg }
                );

                if (!upRes.ok) {
                    const msg = (await upRes.text()) || "Image upload failed";
                    throw new Error(msg);
                }

                const upJson = await upRes.json();
                imageUrl = upJson.imageUrl; // new URL from server
            }


            const payload = {
                ...formData,
                age: Number(formData.age),
                dateOfJoin: new Date(formData.dateOfJoin).toISOString(),
                imageUrl,
            };

            const saveRes = await fetch(
                `https://localhost:7068/api/Employees/updateEmployee/${employee}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!saveRes.ok) {
                const msg = (await saveRes.text()) || "Failed to update employee";
                throw new Error(msg);
            }

            setSuccess("Employee updated successfully.");
            // keep preview in case modal remains open
        } catch (err) {
            setError(err.message || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setError("");
            setSuccess("");
            setLoading(true);

            const res = await fetch(
                `https://localhost:7068/api/Employees/deleteEmployee/${department}/${employee}`,
                { method: "DELETE" }
            );

            const payload = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(payload.message || "Delete failed");
            }

            setSuccess(payload.message || "Employee deleted.");
            setTimeout(() => onClose(), 1500);
        } catch (err) {
            setError(err.message || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };



    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
             <div className="max-h-[90vh] w-full max-w-md overflow-y-auto p-6 bg-white rounded shadow-lg dark:bg-gray-800">
            
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Employee {employee}
                        </h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                            ✕
                        </button>
                    </div>

                    <form  className="p-4 space-y-6">
                        {error && (
                            <div className="p-3 text-red-700 bg-red-100 border border-red-400 rounded">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 text-green-700 bg-green-100 border border-green-400 rounded">
                                {success}
                            </div>
                        )}
                        {/* Image upload */}
                        <div className="flex items-center gap-4">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="object-cover w-16 h-16 border rounded-full"
                                />
                            ) : (
                                <UserCircleIcon className="w-16 h-16 text-gray-400"/>
                            )}
                            <input type="file" accept="image/*" onChange={handleImageChange}/>
                        </div>

                        {/* Grid of inputs */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Input id="firstName" label="First Name" value={formData.firstName} onChange={handleChange}
                                   required/>
                            <Input id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange}
                                   required/>
                            <div>
                        <label htmlFor="department" className={labelStyle}>Department</label>
                        <select
                            id="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={deptLoading || activeDepartments.length === 0}
                            className={inputStyle}
                            required
                        >
                            <option value="">Select Department</option>
                            {activeDepartments.map((d) => (
                                <option key={d.deptId} value={d.deptName}>
                                    {d.deptName}
                                </option>
                            ))}
                        </select>
                    </div>
                            <Input id="phone" label="Phone" value={formData.phone} onChange={handleChange} required/>
                            <Input id="position" label="Position" value={formData.position} onChange={handleChange}
                                   required/>
                            <Input id="age" label="Age" type="number" value={formData.age} onChange={handleChange}
                                   required/>
                            <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange}
                                   required/>
                            <Input id="dateOfJoin" label="Date of Join" type="date" value={formData.dateOfJoin}
                                   onChange={handleChange} required/>
                        </div>

                        {action === "update" && (
                            <button
                                type="submit"
                                disabled={loading}
                                onClick={handleSubmit}
                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5"
                                style={{ backgroundColor: "#16056B", opacity: loading ? 0.6 : 1 }}
                            >
                                {loading ? "Saving…" : "Save changes"}
                            </button>
                        )}

                        {action === "delete" && (
                            <button
                                type="button"          // not a form submit, triggers delete handler
                                onClick={handleDelete}
                                disabled={loading}
                                className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5"
                                style={{ backgroundColor: "#FF0000", opacity: loading ? 0.6 : 1 }}
                            >
                                {loading ? "Deleting…" : "Delete Employee"}
                            </button>
                        )}
                    </form>
                </div>
            </div>
       
    
    );
}

/* ──────────────────────────── Re‑usable input helpers ───────────────────────────── */
function Input({id, label, type = "text", value, onChange, required}) {
    return (
        <div>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={inputFieldClass}
            />
        </div>
    );
}

function Select({ id, label, value, onChange, options, required }) {
    return (
        <div>
            <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className={inputFieldClass}
            >
                {options.map((opt, i) => (
                    <option key={i} value={opt} disabled={opt === ""}>
                        {opt === "" ? "Select department" : opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const labelStyle = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";