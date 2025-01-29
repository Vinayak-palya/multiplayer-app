import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { app } from "./app.js";
import { Chat } from './models/chatModel.js';

// Creating the server
const server = http.createServer(app);
const io = new Server(server);


// Connecting the mongodb database
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}/`)
    } catch (error) {
        console.log("Mongo db connection error and failure", error);
        process.exit(1)
    }
}

// Creating the socket io connection
io.on('connection', (socket) => {
    console.log('Room created with id: ', socket.id);
    socket.on("join_room", (roomId) => {
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    // Listen for new messages
    socket.on("send_message", async (data) => {
        const { roomId, sender, message } = data;
        try {
            const newMessage = await Chat.create({ roomId, sender, message });
            io.to(roomId).emit("new_message", newMessage); // Notify all users in the room
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    // Handle edit messages
    socket.on("edit_message", async (data) => {
        const { messageId, newMessage } = data;
        try {
            const updatedMessage = await Chat.findByIdAndUpdate(
                messageId,
                { message: newMessage, edited: true },
                { new: true }
            );
            io.to(updatedMessage.roomId).emit("message_edited", updatedMessage); // Notify room
        } catch (error) {
            console.error("Error editing message:", error);
        }
    });

    // Handle delete messages
    socket.on("delete_message", async (messageId) => {
        try {
            const deletedMessage = await Chat.findByIdAndDelete(messageId);
            io.to(deletedMessage.roomId).emit("message_deleted", messageId); // Notify room
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("match finished so room vanished", socket.id);
        
    });
});


// starting the server
const PORT = process.env.PORT || 5000;
connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Mongodb connection failed : ", err)
    })
