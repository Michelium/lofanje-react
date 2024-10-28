import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Logout = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        navigate("/", { replace: true });
    };

    handleLogout();

    return <></>;
};

export default Logout;