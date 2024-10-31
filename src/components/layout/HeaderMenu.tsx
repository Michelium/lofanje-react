import React from "react";
import { MdLogout } from "react-icons/md";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

interface HeaderMenuProps {
    children: React.ReactNode;
}

const HeaderMenu = ({ children }: HeaderMenuProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-x-2">
            {children}
            <Button size="small" rounded onClick={() => navigate("/logout", { replace: true })} title="Logout">
                <MdLogout />
            </Button>
        </div>
    );
};

export default HeaderMenu;