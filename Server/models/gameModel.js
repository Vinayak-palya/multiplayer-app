import { Schema } from "mongoose";
import model from "mongoose"

const gameSchema = new Schema({
    playerX:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    playerO:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    board:{
        type:[[String]],
        default:[["", "", ""], ["", "", ""], ["", "", ""]]
    },
    currentTurn:{
        type:String,
        enum:['X', 'O'],
        default:'x'
    },
    status:{
        type: String, 
        enum: ['waiting', 'in-progress', 'completed'], 
        default: 'waiting' 
    },
    winner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},
{
    timestamps:true
})

export const Game = model("Game", gameSchema)