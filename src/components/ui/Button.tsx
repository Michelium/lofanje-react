import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "small" | "medium" | "large";
    color?: "primary";
    children: React.ReactNode;
    onClick?: () => void;
    rounded?: boolean;
}

const Button = ({ color = "primary", size = "medium", children, onClick, rounded = false, ...props }: ButtonProps) => {
    const sizeClasses = size === "small" ? "px-3 py-2 text-sm" : "px-6 py-3 text-lg";

    const colorClasses = {
        primary: "bg-gray-800 hover:bg-gray-700  border-gray-600 hover:border-gray-400 focus:border-gray-400"
    }[color];

    const roundedClasses = rounded ? "rounded-full aspect-square" : "rounded-[4px]";
    
    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} ${colorClasses} ${roundedClasses} border-[1px] font-medium tracking-wide transition-all duration-300 focus:outline-none flex items-center align-middle px-4`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;