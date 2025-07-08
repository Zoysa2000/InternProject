import React, { useState } from "react";
import { IoMdLogIn } from "react-icons/io";

const LoginBtn = ({ onClick }) => {
    const [bgColor, setBgColor] = useState("#16056B");

    return (
        <button
            type="button" 
            onClick={onClick} // calls handleSubmit passed as prop
            style={{ backgroundColor: bgColor }}
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 flex items-center justify-center gap-2"
            onMouseEnter={() => setBgColor("#0f044a")}
            onMouseLeave={() => setBgColor("#16056B")}
        >
            <IoMdLogIn className="w-6 h-6 text-lg" />
            User Login
        </button>
    );
};

export default LoginBtn;


