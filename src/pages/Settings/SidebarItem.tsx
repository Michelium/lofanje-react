import React from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

interface SidebarItemsProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

const SidebarItem = ({ icon, label, isActive, onClick, children }: SidebarItemsProps) => {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const hasChildren = Boolean(children);

    const handleExpandClick = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
        if (onClick) onClick();
    };


    return (
        <div>
            <button
                className={`w-full text-left p-2 flex items-center gap-x-2 border-l-4 border-l-transparent
                   ${isActive ? "bg-gray-700 text-white rounded-md shadow-md border-l-gray-700" : "text-gray-300 hover:bg-gray-600"}`}
                onClick={handleExpandClick}
            >
                {icon}
                {label}
                {hasChildren && (
                    <span className="ml-auto">
                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    </span>
                )}
            </button>
            {isExpanded && hasChildren && (
                <ul className="space-y-2 pl-6">
                    {children}
                </ul>
            )}
        </div>
    );
};

export default SidebarItem;