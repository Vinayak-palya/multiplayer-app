import { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox.jsx"; // Adjust the path as needed
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChats } from "../redux/actions/chatThunk";

function Chat() {
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);

  const chats = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) {
      dispatch(fetchAllChats({ roomId }));
    }
  }, [dispatch, roomId, chats]);
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim()) {
      setJoined(true);
    }
  };

  const handleLeaveRoom = () => {
    setJoined(false);
    setRoomId("");
  };

  return (
    <div className="chat-container h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-900 via-gray-800 to-blue-800">
      {!joined ? (
        <form
          onSubmit={handleJoinRoom}
          className="join-room-form flex flex-col items-center p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg transform transition-all hover:scale-105"
        >
          <h1 className="text-3xl font-bold mb-6 text-white">Join a Room</h1>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="input p-3 bg-gray-700 border border-gray-600 rounded-md mb-6 w-72 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="join-btn p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-72"
          >
            Join Room
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center w-full h-full">
          <div className="room-header flex items-center justify-between w-full p-6 bg-blue-800 text-white shadow-md">
            <h2 className="text-2xl font-semibold">Room ID: {roomId}</h2>
            <button
              onClick={handleLeaveRoom}
              className="leave-btn p-3 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Leave Room
            </button>
          </div>
          <div className="chat-area w-full flex-grow bg-gray-800 p-4 rounded-t-lg shadow-xl">
            {/* ChatBox Component */}
            <ChatBox roomId={roomId} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;