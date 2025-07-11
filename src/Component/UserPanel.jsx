import React from 'react';
import Sidebar from "./SubComponent/Sidebar";
import UserTable from "./UserTable";
import UpdateUser from "./UpdateUser";
import {useState} from "react";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import Chart from "./Chart";
const UserPanel = () => {

    const [view, setView] = useState('chart'); // 'userTable' or 'updateUser'
    return (
        <div>
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <Sidebar onSelectView={setView}/>

            <div className="p-4 sm:ml-64 ">
                {view === 'userTable' && <UserTable/>}
                {view === 'updateUser' && <UpdateUser/>}
                {view === 'deleteUser' && <DeleteUser/>}
                {view === 'addUser' && <AddUser/>}
                {view === 'chart' && <Chart/>}
            </div>

        </div>
    );
};

export default UserPanel;