import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = ({ className = "", ...props }: InputProps) => {
    return (
        <input className={`bg-gray-800 text-white border border-gray-600 rounded-[4px] py-2 px-4 focus:outline-none focus:border-gray-400 focus:bg-gray-700
                           transition-all duration-200 ease-in-out placeholder-gray-400 hover:border-gray-400 ${className}`} {...props}>
        </input>
    );
};

export default Input;