import { createSlice } from "@reduxjs/toolkit";
import { fetchAllChats, sendChat, editChat, deleteChat } from "../actions/chatThunk";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        resetChat: (state) => {
            state.messages = [];
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllChats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = action.payload.data;
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch messages";
            })
            .addCase(sendChat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push(action.payload.data);
            })
            .addCase(sendChat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to send message";
            })
            .addCase(editChat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = state.messages.map((msg) =>
                    msg._id === action.payload.data._id ? action.payload.data : msg
                );
            })
            .addCase(editChat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to edit message";
            })
            .addCase(deleteChat.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = state.messages.filter((msg) => msg._id !== action.payload.data._id);
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to delete message";
            });
    }
})

export const { resetChat } = chatSlice.actions;
export default chatSlice.reducer;