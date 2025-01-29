import { Chat } from "../models/chatModel.js";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/ApiResponse.js";

export const sendChat = async (req, res) => {
    const { roomId, sender, message } = req.body;

    if (!roomId || !sender || !message) {
        throw new ApiError(400, "All fields are required");
    }
    console.log(roomId, sender, message);

    try {
        const newMessage = await Chat.create({ roomId, sender, message });
    return res.status(201).json(new Apiresponse(201, newMessage, "Message sent successfully"));
    } catch (error) {
        throw new ApiError(500, "Internal Server Error");
    }
};

export const getChat = async (req, res) => {
    try {
        const { roomId } = req.params;
        if (!roomId) {
            throw new ApiError(400, "Room Id is required");
        }
        const chat = await Chat.find({ roomId }).populate('sender', 'username avatar');
        return res
            .status(200)
            .json(new Apiresponse(200, chat, "Chat fetched successfully"));
    }
    catch (e) {
        console.log(e)
        throw new ApiError(500, "Internal Server Error")
    }
}

export const editChat = async (req, res) => {
    const { messageId } = req.params;
    const { newMessage } = req.body;

    if (!newMessage) {
        throw new ApiError(400, "Message is required");
    }

    try {
        const updatedMessage = await Chat.findByIdAndUpdate(
            messageId,
            { message: newMessage, edited: true },
            { new: true }
        );

        if (!updatedMessage) {
            throw new ApiError(404, "Message not found");
        }

        res.status(200).json(new Apiresponse(200, updatedMessage, "Message edited successfully"));
    } catch (error) {
        throw new ApiError(500, "Internal Server Error")
    }
};

export const deleteChat = async (req, res) => {
    const { messageId } = req.params;

    try {
        const deletedMessage = await Chat.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            throw new ApiError(404, "Message not found");
        }

        res.status(200).json(new Apiresponse(200, deletedMessage, "Message deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Internal Server Error")
    }
};
