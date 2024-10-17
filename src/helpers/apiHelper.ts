import axios, {Method} from "axios";

const apiRequest = async (
    method: Method,
    url: string,
    data: object | null = null
) => {
    try {
        const response = await axios({
            method,
            url: `http://127.0.0.1:8000${url}`,
            // TODO: Add headers
            // headers: {
            //     'X-API-KEY': 'your-api-key-here',
            // },
            data,
        });
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            alert('Unauthorized: Invalid API key');
        }
        throw error;
    }
};

export default apiRequest;