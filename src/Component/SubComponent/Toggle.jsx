import React, { useEffect, useState } from "react";

const Toggle = () => {
    const [isChecked, setIsChecked] = useState(() => {
        if (localStorage.theme === 'dark') return true
        if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) return true
        return false
    })

    useEffect(() => {
        const html = document.documentElement
        if (isChecked) {
            html.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            html.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }, [isChecked])

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div className="right-4 z-50">
            <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1 ">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />

                {/* Light Mode Button */}
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium transition-all duration-300 ${
                        !isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                    }`}
                >
          <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mr-[6px] fill-current"
          >
            <g clipPath="url(#clip0_3122_652)">
              <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C8.36819 0 8.66667 0.298477 8.66667 0.666667V2C8.66667 2.36819 8.36819 2.66667 8 2.66667C7.63181 2.66667 7.33333 2.36819 7.33333 2V0.666667C7.33333 0.298477 7.63181 0 8 0ZM8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333ZM4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8ZM8.66667 14C8.66667 13.6318 8.36819 13.3333 8 13.3333C7.63181 13.3333 7.33333 13.6318 7.33333 14V15.3333C7.33333 15.7015 7.63181 16 8 16C8.36819 16 8.66667 15.7015 8.66667 15.3333V14ZM2.3411 2.3424C2.60145 2.08205 3.02356 2.08205 3.28391 2.3424L4.23057 3.28906C4.49092 3.54941 4.49092 3.97152 4.23057 4.23187C3.97022 4.49222 3.54811 4.49222 3.28776 4.23187L2.3411 3.28521C2.08075 3.02486 2.08075 2.60275 2.3411 2.3424ZM12.711 11.7682C12.4506 11.5078 12.0285 11.5078 11.7682 11.7682C11.5078 12.0285 11.5078 12.4506 11.7682 12.711L12.7148 13.6577C12.9752 13.918 13.3973 13.918 13.6577 13.6577C13.918 13.3973 13.918 12.9752 13.6577 12.7148L12.711 11.7682ZM0 8C0 7.63181 0.298477 7.33333 0.666667 7.33333H2C2.36819 7.33333 2.66667 7.63181 2.66667 8C2.66667 8.36819 2.36819 8.66667 2 8.66667H0.666667C0.298477 8.66667 0 8.36819 0 8ZM14 7.33333C13.6318 7.33333 13.3333 7.63181 13.3333 8C13.3333 8.36819 13.6318 8.66667 14 8.66667H15.3333C15.7015 8.66667 16 8.36819 16 8C16 7.63181 15.7015 7.33333 15.3333 7.33333H14ZM4.23057 11.7682C4.49092 12.0285 4.49092 12.4506 4.23057 12.711L3.28391 13.6577C3.02356 13.918 2.60145 13.918 2.3411 13.6577C2.08075 13.3973 2.08075 12.9752 2.3411 12.7148L3.28776 11.7682C3.54811 11.5078 3.97022 11.5078 4.23057 11.7682ZM13.6577 3.28521C13.918 3.02486 13.918 2.60275 13.6577 2.3424C13.3973 2.08205 12.9752 2.08205 12.7148 2.3424L11.7682 3.28906C11.5078 3.54941 11.5078 3.97152 11.7682 4.23187C12.0285 4.49222 12.4506 4.49222 12.711 4.23187L13.6577 3.28521Z"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3122_652">
                <rect width="16" height="16" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          Light
        </span>

                {/* Dark Mode Button */}
                <span
                    className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium transition-all duration-300 ${
                        isChecked ? 'text-primary bg-gray-300' : 'text-body-color'
                    }`}
                >
          <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              className="mr-[6px] fill-current"
          >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.0547 1.67334C8.18372 1.90227 8.16622 2.18562 8.01003 2.39693C7.44055 3.16737 7.16651 4.11662 7.23776 5.07203C7.30901 6.02744 7.72081 6.92554 8.39826 7.60299C9.07571 8.28044 9.97381 8.69224 10.9292 8.76349C11.8846 8.83473 12.8339 8.5607 13.6043 7.99122C13.8156 7.83502 14.099 7.81753 14.3279 7.94655C14.5568 8.07556 14.6886 8.32702 14.6644 8.58868C14.5479 9.84957 14.0747 11.0512 13.3002 12.053C12.5256 13.0547 11.4818 13.8152 10.2909 14.2454C9.09992 14.6756 7.81108 14.7577 6.57516 14.4821C5.33925 14.2065 4.20738 13.5846 3.312 12.6892C2.41661 11.7939 1.79475 10.662 1.51917 9.42608C1.24359 8.19017 1.32569 6.90133 1.75588 5.71038C2.18606 4.51942 2.94652 3.47561 3.94828 2.70109C4.95005 1.92656 6.15168 1.45335 7.41257 1.33682C7.67423 1.31264 7.92568 1.44442 8.0547 1.67334Z"
            ></path>
          </svg>
          Dark
        </span>
            </label>
        </div>
    )
};

export default Toggle;
