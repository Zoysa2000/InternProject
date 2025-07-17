import React from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "./Toggle";
import { useMainMenu } from "./MainMenu";

const Sidebar = ({ onSelectView, isOpen, onClose }) => {
    const [submenuOpenId, setSubmenuOpenId] = React.useState(null);
    const [showPopup, setShowPopup] = React.useState(false);
    const navigate = useNavigate();
    const { mainmenu } = useMainMenu();

    const activeMenu = mainmenu.filter(d => d.isActive && d.systemID === "S001");

    const handleSignOut = () => {
        setShowPopup(true);
        setTimeout(() => navigate("/"), 5000);
    };

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform duration-300 transform bg-[#16056B] dark:bg-gray-800 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex justify-end sm:hidden">
                        <button
                            onClick={onClose}
                            className="text-2xl font-bold text-gray-800 dark:text-gray-200"
                        >
                            ×
                        </button>
                    </div>

                    <img src="logo.png" alt="Logo" className="w-full mb-6" style={{ height: "100px" }} />

                    <ul className="space-y-5 font-medium">
                        {activeMenu.map((item) => {
                            const hasSubmenus = item.subMenus && item.subMenus.length > 0;
                            const isOpenSubmenu = submenuOpenId === item.id;

                            return (
                                <li key={item.id}>
                                    <a
                                        href="/"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (hasSubmenus) {
                                                setSubmenuOpenId(prev => (prev === item.id ? null : item.id));
                                            } else if (item.actionName.toLowerCase().includes("sign out")) {
                                                handleSignOut();
                                            } 
                                        }}
                                        className="flex items-center justify-between p-2 text-gray-900 bg-white rounded-lg hover:bg-gray-400"
                                    >
                                        <span>{item.actionName}</span>
                                        {hasSubmenus && (
                                            <span className="text-sm">
                                                {isOpenSubmenu ? "▲" : "▼"}
                                            </span>
                                        )}
                                    </a>

                                    {isOpenSubmenu && hasSubmenus && (
                                        <ul className="py-2 space-y-2">
                                            {item.subMenus
                                                .filter(sub => sub.isActive)
                                                .map(sub => (
                                                    <li key={sub.subMenuId}>
                                                        <a
                                                            href="/"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                onSelectView(sub.componentName);
                                                                if (onClose) onClose();
                                                            }}
                                                            className="block p-2 text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                        >
                                                            {sub.displayName}
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}

                        <li>
                            <Toggle />
                        </li>
                    </ul>
                </div>
            </aside>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 text-center bg-white rounded shadow-lg">
                        <button
                            disabled
                            type="button"
                            className="text-white bg-[#16056B] font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Signing Out...
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;


