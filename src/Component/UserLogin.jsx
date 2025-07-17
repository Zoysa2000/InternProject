import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBtn from "./SubComponent/LoginBtn";
import ModeBtn from "./SubComponent/ModeBtn";
import PasswordChange from "./PasswordChange";

const UserLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);

    const handleSubmit = async (e) => {
        if (e?.preventDefault) e.preventDefault();

        setMessage("");
        setMessageType("");

        try {
            const response = await fetch(
                "https://localhost:7068/api/UserLogin/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage(data.message || "Login successful!");
                setMessageType("success");
                setTimeout(() => navigate("/userpanel"), 2500);
            } else {
                setMessage(data.message || "Login failed. Check your credentials.");
                setMessageType("error");
            }
        } catch (err) {
            setMessage("Server error: " + err.message);
            setMessageType("error");
        }
    };

    return (
        <>
            {/* Modal */}
            <PasswordChange
                open={showForgotModal}
                onClose={() => setShowForgotModal(false)}
            />


            <section className="h-screen bg-gray-50 dark:bg-gray-900">
                <ModeBtn />
                <div className="flex items-center justify-center h-full px-4">
                    <div className="w-full bg-white rounded-lg shadow-xl dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 sm:p-8">
                            <div className="text-center">
                                <img
                                    src="./logo.png"
                                    alt="Company Logo"
                                    className="mx-auto mb-4 w-25 h-25"
                                />
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to TaskMate Systems (Pvt) Ltd
                                </h1>

                                {message && (
                                    <div
                                        className={`mt-4 p-3 rounded border text-center text-sm ${
                                            messageType === "success"
                                                ? "border-green-500 text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-200"
                                                : "border-red-500 text-red-700 bg-red-100 dark:bg-red-800 dark:text-red-200"
                                        }`}
                                    >
                                        {message}
                                    </div>
                                )}
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="name@company.com"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                     focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Forgot Password */}
                                <div className="text-sm text-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotModal(true)}
                                        className="text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        Forgot My Password?
                                    </button>
                                </div>

                                {/* Submit */}
                                <LoginBtn onClick={handleSubmit} />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserLogin;



