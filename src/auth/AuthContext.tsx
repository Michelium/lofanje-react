import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    const setToken = (token: string | null) => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
        setToken_(token);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const contextValue = useMemo(() => ({ token, setToken }), [token]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
