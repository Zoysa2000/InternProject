import React, { useState } from 'react';
import { LiaRegistered } from "react-icons/lia";

const RegisterBtn = ({ onClick, loading = false }) => {
    const [bgColor, setBgColor] = useState('#16056B');

    return (
        <button
            type="button"
            style={{ backgroundColor: loading ? '#9ca3af' : bgColor }}
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            onMouseEnter={() => !loading && setBgColor('#0f044a')}
            onMouseLeave={() => !loading && setBgColor('#16056B')}
            onClick={onClick}
            disabled={loading}
        >
            {loading ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Registering...
                </>
            ) : (
                <>
                    <LiaRegistered className="text-lg h-6 w-6" />
                    User Register
                </>
            )}
        </button>
    );
};

export default RegisterBtn;

