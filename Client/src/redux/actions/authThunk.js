import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserAPI,
  loginUserAPI,
  logoutUserAPI,
  fetchCurrentUserAPI,
  googleLoginAPI,
  googleCallbackAPI,
  refreshTokenAPI,
  changePasswordAPI,
} from "../../services/authService";

export const register = createAsyncThunk("/register", async (formData) => {
  const response = await registerUserAPI(formData);
  console.log(response.data);
  return response.data;
})
export const login = createAsyncThunk("/login", async ({email, password }) => {
  const response = await loginUserAPI({email, password});
  console.log(response.data);
  return response.data;
});

export const googleLogin = createAsyncThunk("/googleLogin", async (token) => {
  const response = await googleLoginAPI(token);
  return response.data;
});

export const googleCallback = createAsyncThunk("/googleCallback", async (code) => {
  const response = await googleCallbackAPI({ code });
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk("/fetchCurrentUser", async () => {
  const response = await fetchCurrentUserAPI();
  return response.data;
});

export const logout = createAsyncThunk("/logout", async () => {
  await logoutUserAPI();
});
export const refreshToken = createAsyncThunk("/refresh-token", async (token) => {
    const response = await refreshTokenAPI(token);
    return response.data;
})
export const changePassword = createAsyncThunk("/change-password", async({oldPassword, newPassword}) => {
  const response = await changePasswordAPI({oldPassword, newPassword});
  return response;
})