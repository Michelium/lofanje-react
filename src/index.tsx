import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Lofanje from "./pages/Lofanje";
import AuthProvider, { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";

const AppRoutes = () => {
    const { token } = useAuth();

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: <Lofanje />
                },
                {
                    path: "/logout",
                    element: <Logout />
                }
            ]
        }
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <Login />
        }
    ];

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly
    ]);

    return <RouterProvider router={router} />;
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
