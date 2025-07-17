import React, { useState } from 'react';
import Sidebar from "./SubComponent/Sidebar";
import UserTable from "./UserTable";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import Chart from "./Chart";
import FileUpload from './FileUpload';

const UserPanel = () => {
    const [view, setView] = useState('chart');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSelectView = (selectedView) => {
        setView(selectedView);
        setSidebarOpen(false);
    };

    return (
        <div className="relative min-h-screen bg-gray-100">

            {/* Mobile hamburger button */}
            <button
                onClick={() => setSidebarOpen(true)}
                type="button"
                className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 5h14a1 1 0 000-2H3a1 1 0 000 2zm14 6H3a1 1 0 000 2h14a1 1 0 000-2zm0 6H3a1 1 0 000 2h14a1 1 0 000-2z" />
                </svg>
            </button>

            {/* Desktop Sidebar */}
            <div className="fixed top-0 left-0 hidden w-64 h-full bg-white shadow sm:block">
                <Sidebar onSelectView={handleSelectView} />
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex sm:hidden">
                    <div className="fixed inset-0 w-1/2 bg-white"></div>
                    <div className="relative z-50 w-64 h-full p-4 bg-white shadow-lg">
                        <Sidebar
                            onSelectView={handleSelectView}
                            isOpen={sidebarOpen}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="p-4 sm:ml-64">
                {view === 'userTable' && <UserTable />}
                {view === 'updateUser' && <UpdateUser />}
                {view === 'deleteUser' && <DeleteUser />}
                {view === 'addUser' && <AddUser />}
                {view === 'chart' && <Chart />}
                {view === 'uploadFile' && <FileUpload />}
            </div>
        </div>
    );
};

export default UserPanel;


