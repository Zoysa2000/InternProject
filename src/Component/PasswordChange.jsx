import React, { useState } from "react";

const PasswordChange = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const isPasswordValid = newPassword.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        setError(null);
        setSuccess(null);

        if (!isPasswordValid) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://localhost:7068/api/UserPasswordChange/reset-password",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, newPassword }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to reset password");
            }

            setSuccess("Password reset successful!");
            setEmail("");
            setNewPassword("");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    <span className="sr-only">Close modal</span>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Reset your password
                </h3>

                {/* Feedback Messages */}
                {error && (
                    <div className="mb-4 border border-red-600 text-red-700 bg-red-50 dark:bg-red-200 p-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 border border-green-600 text-green-700 bg-green-50 dark:bg-green-200 p-3 rounded-lg text-sm">
                        {success}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               block w-full p-2.5
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="name@company.com"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            New password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               block w-full p-2.5
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="••••••••"
                        />
                        {!isPasswordValid && newPassword && (
                            <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                Password must be at least 6 characters.
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        style={{backgroundColor:"#16056B"}}
                        type="submit"
                        disabled={loading || !isPasswordValid}
                        className="w-full text-white focus:ring
           font-medium rounded-lg text-sm px-5 py-2.5 text-center  disabled:cursor-not-allowed"
                    >
                        {loading ? "Resetting..." : "Reset My Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordChange;
