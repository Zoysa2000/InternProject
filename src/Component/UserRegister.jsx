import React, { useState } from 'react';
import RegisterBtn from "./SubComponent/RegisterBtn";
import ModeBtn from "./SubComponent/ModeBtn";
import {useNavigate} from "react-router-dom";

const UserRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
        // Clear messages when user starts typing
        if (message) {
            setMessage('');
            setMessageType('');
        }
    };

    // Reset form to initial state
    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        });
    };

    // Handler to register user
    const handleRegisterClick = async () => {
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            // Prepare data with correct property names for backend
            const requestData = {
                Email: formData.email,
                Password: formData.password,
                ConfirmPassword: formData.confirmPassword,
                AcceptTerms: formData.acceptTerms
            };

            const res = await fetch(
                "https://localhost:7068/api/UserRegistrations/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(requestData),
                }
            );

            const responseData = await res.json();

            if (!res.ok) {
                setMessage(responseData.message || 'Registration failed');
                setMessageType('error');
                return;
            }

            setMessage(responseData.message || 'Registration successful!');
            setMessageType('success');
            resetForm(); // Clear form on success
            setTimeout(() => navigate('/login'), 500);

        } catch (err) {
            console.error('Registration error:', err);
            setMessage(`Network error: ${err.message}`);
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <ModeBtn />
            <div className="flex items-center justify-center h-full px-4">
                <div className="w-full bg-white rounded-lg shadow-xl dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-2 sm:p-8">
                        <div className="text-center">
                            <img src="./logo.gif" alt="Company Logo" className="mx-auto mb-2 w-25 h-25" />
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create User Account
                            </h1>
                        </div>

                        {/* Message Display */}
                        {message && (
                            <div className={`p-4 rounded-lg text-sm ${
                                messageType === 'success'
                                    ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-800 dark:text-green-200'
                                    : 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-800 dark:text-red-200'
                            }`}>
                                {message}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                             focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="acceptTerms"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50
                               focus:ring-3 focus:ring-blue-300 dark:bg-gray-700
                               dark:border-gray-600 dark:focus:ring-blue-600"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="acceptTerms" className="font-light text-gray-500 dark:text-gray-300">
                                        I accept the{" "}
                                        <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>

                            <RegisterBtn
                                onClick={handleRegisterClick}
                                loading={loading}
                            />

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserRegister;
