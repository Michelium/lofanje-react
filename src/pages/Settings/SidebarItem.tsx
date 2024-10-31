import React from "react";

interface SidebarItemsProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
    nested?: boolean;
}

const SidebarItem = ({ icon, label, isActive, onClick, nested = false }: SidebarItemsProps) => {
    return (
        <button
            className={`w-full text-left p-2 flex items-center gap-x-2 border-l-4 
                ${isActive ? "border-gray-400 font-bold" : "border-transparent"} 
                ${nested ? "pl-8" : ""}`}
            onClick={onClick}
        >
            {icon} {label}
        </button>
    );
};

export default SidebarItem;