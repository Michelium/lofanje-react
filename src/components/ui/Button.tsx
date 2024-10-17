import React from 'react';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    color?: string; // Tailwind colors
    children: React.ReactNode;
    onClick?: () => void;
}

const Button = ({size = 'medium', color = 'purple', children, onClick}: ButtonProps) => {
    const sizeClasses = size === 'small' ? 'px-3 py-2 text-sm' : 'px-6 py-3 text-lg';

    const colorClasses = {
        primary: '  hover:bg-violet-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
    }[color];
    
    return (
        <button
            onClick={onClick}
            className={`rounded-md ${sizeClasses} ${colorClasses} bg-violet-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-${color}-500`}

        >
            {children}
        </button>
    );
};

export default Button;