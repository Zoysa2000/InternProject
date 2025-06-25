import React, { useState } from 'react';
import { IoMdLogIn } from "react-icons/io";
import {useNavigate} from "react-router-dom";

const LoginBtn = () => {
    const [bgColor, setBgColor] = useState('#16056B');
    const navigate = useNavigate()

    const handleLogin =() =>
    {
    navigate("/userpanel")
    }


    return (
        <button onClick={handleLogin}
            type="submit"
            style={{ backgroundColor: bgColor }}
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 flex items-center justify-center gap-2"
            onMouseEnter={() => setBgColor('#0f044a')}
            onMouseLeave={() => setBgColor('#16056B')}
        >
            <IoMdLogIn className="text-lg h-6 w-6" />
            User Login
        </button>
    );
};

export default LoginBtn;

