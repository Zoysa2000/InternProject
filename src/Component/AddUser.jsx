import React, { useState } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { IoMdPersonAdd } from "react-icons/io";
import useDepartments from "./SubComponent/Department";

export default function AddUser() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { departments, loading: deptLoading,} = useDepartments(); // custom hook
    const activeDepartments = departments.filter(d => d.isActive);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        phone: '',
        position: '',
        age: '',
        email: '',
        dateOfJoin: '',
        imageUrl: '',
        termsAccepted: false
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setImageFile(file);
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!formData.termsAccepted) {
            setErrorMessage("Please accept the terms and conditions.");
            return;
        }

        if (!imageFile) {
            setErrorMessage("Please upload an image.");
            return;
        }

        try {
            // Upload image
            const formImage = new FormData();
            formImage.append('image', imageFile);

            const uploadRes = await fetch("https://localhost:7068/api/Employees/uploadImage", {
                method: "POST",
                body: formImage
            });

            let uploadData;
            try {
                uploadData = await uploadRes.json();
            } catch {
                const text = await uploadRes.text();
                throw new Error(text || "Image upload failed");
            }

            if (!uploadRes.ok) {
                throw new Error(uploadData.message || "Image upload failed");
            }

            const payload = {
                ...formData,
                age: Number(formData.age),
                dateOfJoin: new Date(formData.dateOfJoin).toISOString(),
                imageUrl: uploadData.imageUrl
            };

            const res = await fetch("https://localhost:7068/api/Employees/addEmployee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to save employee");

            setSuccessMessage(data.message || "Employee added successfully.");
            setFormData({
                firstName: '',
                lastName: '',
                department: '',
                phone: '',
                position: '',
                age: '',
                email: '',
                dateOfJoin: '',
                imageUrl: '',
                termsAccepted: false
            });
            setImageFile(null);
            setImagePreview(null);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl p-8 bg-white border border-gray-300 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700"
            >
                <h1 className="mb-3 text-2xl font-bold text-center text-gray-900 dark:text-white">
                    Create Profile For New Employee
                </h1>

                {errorMessage && (
                    <div className="p-3 mb-4 text-red-800 bg-red-100 border border-red-400 rounded">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="p-3 mb-4 text-green-800 bg-green-100 border border-green-400 rounded">
                        {successMessage}
                    </div>
                )}

                {/* Image preview */}
                <div className="flex items-center mb-6 space-x-4">
                    <div className="shrink-0">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Selected"
                                className="object-cover w-16 h-16 border border-gray-400 rounded-full"
                            />
                        ) : (
                            <UserCircleIcon className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                        )}
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </label>
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} label="First Name" placeholder="John" required />
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} label="Last Name" placeholder="Doe" required />

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

                    <Input id="phone" value={formData.phone} onChange={handleChange} label="Phone Number" placeholder="071xxxxxxx" required />
                    <Input id="position" value={formData.position} onChange={handleChange} label="Position" placeholder="Software Engineer" required />
                    <Input id="age" value={formData.age} onChange={handleChange} label="Age" type="number" required />
                    <Input id="email" value={formData.email} onChange={handleChange} label="Email" type="email" required />
                    <Input id="dateOfJoin" value={formData.dateOfJoin} onChange={handleChange} label="Date of Join" type="date" required />
                </div>

                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="termsAccepted"
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-3 focus:ring-blue-300"
                        />
                    </div>
                    <label htmlFor="termsAccepted" className="text-sm font-medium text-gray-900 ms-2 dark:text-white">
                        I agree with the <a href="/" className="text-blue-600 hover:underline">terms and conditions</a>.
                    </label>
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-x-2 text-white bg-[#16056B] hover:bg-[#10034d] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    <IoMdPersonAdd />
                    Add Employee
                </button>
            </form>
        </div>
    );
}

function Input({ id, label, type = "text", value, onChange, placeholder, required }) {
    return (
        <div>
            <label htmlFor={id} className={labelStyle}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={inputStyle}
            />
        </div>
    );
}

const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const labelStyle = "block mb-2 text-sm font-medium text-gray-900 dark:text-white";



