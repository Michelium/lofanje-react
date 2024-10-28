import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="flex gap-x-2">
            <Button size="small" rounded onClick={() => navigate("/settings")} title="Settings">
                <MdSettings/>
            </Button>
            <Button size="small" rounded onClick={() => navigate("/logout", { replace: true })} title="Logout">
                <MdLogout />
            </Button>
        </div>
    );
};

export default HeaderMenu;