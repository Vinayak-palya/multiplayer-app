import api from "./apiService";
export const loginUserAPI = ({ email, password }) => api.post("/login", { email, password });
export const logoutUserAPI = () => api.post("/logout");
export const fetchCurrentUserAPI = () => api.get("/current-user");
export const refreshTokenAPI = () => api.post("/refresh-token");
export const registerUserAPI = (formData) => {
    return api.post("/register", formData);
};
export const googleLoginAPI = ({ token }) => api.get("/google", { token });
export const googleCallbackAPI = () => api.get("/google/callback");
export const changePasswordAPI = ({ oldPassword, newPassword }) => api.post("/change-password", { oldPassword, newPassword });