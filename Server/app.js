import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import passport from "passport";
import session from "express-session";
import configurePassport from "./config/passport.js";
import {  configDotenv } from "dotenv";

const app = express();


configDotenv({
    path:'./.env'
}) 
configurePassport(passport);
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}))

 
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(session({
  secret: 'your-secret-key',    
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

import userRoutes from "./routes/userRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
app.use("/api/v1/", userRoutes);
app.use("/api/v1/chat", chatRoutes);
export {app}