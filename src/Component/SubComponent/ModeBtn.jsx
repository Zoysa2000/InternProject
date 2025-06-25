import React, { useEffect, useState } from 'react';

const ModeBtn = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <div className="inline-flex items-start gap-2">
                <div className="relative inline-block w-11 h-5">
                    <input
                        id="dark-mode-toggle"
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        className="peer appearance-none w-11 h-5 bg-gray-400 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                    />
                    <label
                        style={{backgroundColor:"#16056B"}}
                        htmlFor="dark-mode-toggle"
                        className="absolute top-0 left-0 w-5 h-5 rounded-full border  shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
                    />
                </div>

                <label htmlFor="dark-mode-toggle" className="text-slate-600 text-sm cursor-pointer select-none dark:text-white">
                    <div>
                        <p className="text-slate-500 dark:text-white">
                            Toggle between light and dark theme.
                        </p>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default ModeBtn;
