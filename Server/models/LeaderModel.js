import { Schema } from "mongoose";
import { model } from "mongoose";

const LeaderboardSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId, 
        ref:'User'
    },
    score:{
        type:Number,
        default:0,

    },
    lastUpdated:{
        type:Date,
        default:Date.now(),
    }
})

export const LeaderBoard = model('LeaderBoard', LeaderboardSchema)