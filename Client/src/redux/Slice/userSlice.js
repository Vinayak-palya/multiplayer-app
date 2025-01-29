import { createSlice } from "@reduxjs/toolkit";
import { login, logout, googleCallback, googleLogin, fetchCurrentUser, refreshToken, changePassword, register } from "../actions/authThunk";
import Cookies from "js-cookie"


const userSlice = createSlice({
  name: "userDetail",
  initialState: {
    user: null,
    isLoading: false,
    token: null,
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.user = action.payload.data;
        localStorage.setItem("accessToken", Cookies.get("accessToken") || action.payload.data.data);
        localStorage.setItem("user", JSON.stringify(action.payload.data.data));
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Sign up failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.user = action.payload.data.user;

        // Store in localStorage
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;

        // Remove from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout failed";
      })

      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.user = action.payload.user;

        // Store in localStorage
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Google login failed";
      })

      .addCase(googleCallback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleCallback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;
        state.user = action.payload.data.user;

        // Store in localStorage
        localStorage.setItem("accessToken", action.payload.data.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(googleCallback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Google callback failed";
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;

        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch current user";
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.accessToken;

        // Update in localStorage
        localStorage.setItem("accessToken", action.payload.data.accessToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to refresh token";
      })

      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.data.user;

        // Store updated accessToken and user in localStorage
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to change password";
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
