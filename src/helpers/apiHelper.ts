import axios, { Method } from "axios";

const getAuthToken = (): string | null => {
    return localStorage.getItem("token");
};

const apiRequest = async (
    method: Method,
    url: string,
    data: object | null = null
) => {
    const token = getAuthToken();

    try {
        const response = await axios({
            method,
            url: `http://127.0.0.1:8000${url}`,
            headers: {
                "Authorization": token ? `Bearer ${token}` : "",
                "Content-Type": "application/json",
            },
            data,
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized: Token is invalid or expired");

            localStorage.removeItem("token");
            window.location.href = "/login";

            throw new Error("Session expired. Please log in again.");
        } else {
            throw error;
        }
    }
};

export default apiRequest;