import { Schema, model } from "mongoose"

const chatModel = new Schema({
    roomId: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    edited: {
        type: Boolean,
        default: false,
    },
    sentAt: {
        type: Date,
        default: Date.now(),

    }
}, {
    timestamps: true
})


export const Chat = model('Chat', chatModel);
