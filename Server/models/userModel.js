import  { model,Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password: {
        type: String,
        required: function () {
          return !this.googleId;
        },
      },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
    },
    wins:{
        type:Number,
        default:0       
    },
    losses:{
        type:Number,
        default:0,
    },
    draw:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    avatar:{
        type:String,
        required:true
    },
    refreshToken: {   // Add this line to the schema
        type: String, 
        select: false, // Excluded by default for security purposes
    },

},{
    timestamps:true
})

userSchema.methods.ispasswordCorrect = async function(password)
{
    console.log("password : ", password);
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    const token = jwt.sign(
        {
            _id:this._id,
            email:this.email,
            usernmae:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn:"10d",
        }
    )
    return token;
}
userSchema.methods.generateRefreshToken = function name() {
    const token = jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn:"1d",
        }
    )

    return token;
}
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

export const User =  model('User', userSchema);