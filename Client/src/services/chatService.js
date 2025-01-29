import api from "./apiService";
export const fetchAllChatsAPI = ({roomId}) => api.get(`/chat/${roomId}`);
export const sendChatAPI = ({ roomId, message, sender }) => api.post("/chat/send/", { roomId, message, sender });
export const editChatAPI = ({ messageId, newMessage }) => api.put(`/chat/edit/${messageId}`, { newMessage });
export const deleteChatAPI = ({ messageId }) => api.delete(`/chat/delete/${messageId}`);