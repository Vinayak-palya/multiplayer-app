import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllChatsAPI, sendChatAPI, editChatAPI, deleteChatAPI } from "../../services/chatService";

export const fetchAllChats = createAsyncThunk("/chat/fetchAllChats", async ({roomId}) => {
  const response = await fetchAllChatsAPI({roomId});
  return response.data;
});
export const sendChat = createAsyncThunk("/chat/sendChat", async ({ roomId, message, sender }) => {
  const response = await sendChatAPI({ roomId, message, sender });
  console.log(response);
  return response.data;
});

export const editChat = createAsyncThunk("/chat/editChat", async ({ messageId, newMessage }) => {
  const response = await editChatAPI({ messageId, newMessage });
  return response.data;
});
export const deleteChat = createAsyncThunk("/chat/deleteChat", async ({ messageId }) => {
  const response = await deleteChatAPI({ messageId });
  return response.data;
});