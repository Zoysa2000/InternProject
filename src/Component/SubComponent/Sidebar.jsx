import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "./Toggle";
import {
    MdManageAccounts,
    MdUpdate,
    MdAutoDelete,
} from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { GrView } from "react-icons/gr";

const Sidebar = ({ onSelectView }) => {
    const [isOpen, setIsOpen] = useState(false);   // submenu open/close
    const [showPopup, setShowPopup] = useState(false); // logout modal
    const navigate = useNavigate();


    const handleSignOut = () => {
        setShowPopup(true);
        setTimeout(() => navigate("/"), 5000);
    };

    return (
        <>
            {/* ---------- main sidebar ---------- */}
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
                    {/* logo */}
                    <img
                        src="logo.gif"
                        alt="Logo"
                        className="w-full mb-6"
                        style={{ height: "100px" }}
                    />

                    <ul className="space-y-5 font-medium">
                        {/* ---------- Manage Employee ---------- */}
                        <li>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center w-full p-2 text-base text-gray-900 rounded-lg bg-gray-400 dark:hover:bg-gray-700 group"
                            >
                                <MdManageAccounts className="w-7 h-7"/>
                                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  Manage Employee
                </span>
                                <svg
                                    className={`w-3 h-3 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                >
                                    <path
                                        d="m1 1 4 4 4-4"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* submenu */}
                            <ul className={`${isOpen ? "" : "hidden"} py-2 space-y-2`}>
                                <li>
                                    <a
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelectView("userTable");
                                        }}
                                        className="flex items-center w-full p-2 pl-11 text-gray-900 rounded-lg bg-gray-300"
                                    >
                                        <GrView className="w-5 h-5 me-2"/>
                                        View Employee
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelectView("addUser");
                                        }}
                                        className="flex items-center w-full p-2 pl-11 text-gray-900 rounded-lg bg-gray-300"
                                    >
                                        <IoIosPersonAdd className="w-5 h-5 me-2"/>
                                        Add Employee
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelectView("updateUser");
                                        }}
                                        className="flex items-center w-full p-2 pl-11 text-gray-900 rounded-lg bg-gray-300"
                                    >
                                        <MdUpdate className="w-5 h-5 me-2"/>
                                        Update Employee
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onSelectView("deleteUser");
                                        }}
                                        className="flex items-center w-full p-2 pl-11 text-gray-900 rounded-lg bg-gray-300"
                                    >
                                        <MdAutoDelete className="w-5 h-5 me-2"/>
                                        Delete Employee
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-400 dark:hover:bg-gray-700 group"
                            >
                                {/* Kanban icon */}
                                <svg
                                    className="shrink-0 w-5 h-5 text-gray-900"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 18 18"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                                <span
                                    className="ms-3 inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-400 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSignOut();
                                }}
                                className="flex items-center gap-x-2 p-2 text-gray-900 rounded-lg bg-gray-400 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-900"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 18 16"
                                    fill="none"
                                >
                                    <path
                                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="flex-1">Sign Out</span>
                            </a>
                        </li>


                        <li>
                            <Toggle/>
                        </li>
                    </ul>
                </div>
            </aside>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-center bg-white rounded shadow-lg dark:bg-gray-800">
                        <button disabled type="button"
                                className="text-white bg-[#16056B] focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center">
                            <svg aria-hidden="true" role="status"
                                 className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="#E5E7EB"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentColor"/>
                            </svg>
                           Sign Out....
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
