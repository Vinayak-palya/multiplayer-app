import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const api = axios.create({
    baseURL:API_URL,
    withCredentials:true,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;