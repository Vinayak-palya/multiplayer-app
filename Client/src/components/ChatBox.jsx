import { useDispatch, useSelector } from "react-redux";
import { sendChat, editChat, deleteChat, fetchAllChats } from "../redux/actions/chatThunk.js"; 
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ChatBox({ roomId }) {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.messages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [xp, setXp] = useState(0); // Gamification: XP tracking
  const user = useSelector((state) => state.user);
  const profile = user?.user?.data;
  const { _id, avatar, username } = profile || {};

  useEffect(() => {
    if (roomId) {
      dispatch(fetchAllChats({ roomId }));
    }
  }, [dispatch, roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      dispatch(sendChat({ roomId, message: newMessage, sender: _id }));
      setNewMessage("");
      setIsTyping(false);
      setXp(xp + 10); // Increase XP when sending a message
    }
  };

  const handleEditMessage = (messageId, newMessage) => {
    if (newMessage.trim()) {
      dispatch(editChat({ messageId, newMessage }));
    }
  };

  const handleDeleteMessage = (messageId) => {
    dispatch(deleteChat({ messageId }));
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  return (
    <div className="chat-box relative bg-gray-900 rounded-lg shadow-lg p-6 h-full flex flex-col space-y-4 border-2 border-yellow-500">
      {/* XP Counter */}
      <div className="absolute top-4 right-4 bg-yellow-500 text-black p-2 rounded-full shadow-lg">
        🏆 XP: {xp}
      </div>

      {/* Messages Container */}
      <div className="messages-container flex-grow overflow-y-auto bg-gray-800 rounded-lg p-4 space-y-4">
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`flex items-start space-x-4 p-4 rounded-lg shadow-md transition-all transform hover:scale-105 ${
                chat.sender === _id ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
              }`}
            >
              <img
                src={avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{username}</span>
                  {chat.sender === _id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditMessage(chat._id, prompt("Edit message", chat.message))}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(chat._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-1 text-lg">{chat.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No chats available in this room.</p>
        )}
      </div>

      {/* Send Message Form */}
      <div className="send-message-form flex items-center space-x-4 mt-4">
        <textarea
          value={newMessage}
          onChange={handleTyping}
          placeholder="Type your message..."
          className="message-input p-4 bg-gray-800 text-white rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSendMessage}
          className="send-btn p-4 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transform transition-all hover:scale-105"
        >
          🚀 Send
        </button>
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="typing-indicator absolute bottom-0 right-0 p-2 text-sm text-yellow-400 animate-pulse">
          <p>Someone is typing...</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
