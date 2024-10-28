import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import apiRequest from "../../helpers/apiHelper";

const Login = () => {
    const { setToken } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            apiRequest("POST", "/api/login_check", { username, password })
                .then((response) => {
                    const { token } = response;

                    setToken(token);

                    navigate("/");

                }, (error) => {
                    console.error("Login error:", error);
                    setError("Invalid username or password. Please try again.");
                });
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-8 bg-gray-900 rounded-md shadow-md">
                <h2 className="text-2xl text-white font-bold mb-4">Lofanje login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white mb-2">username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-gray-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
