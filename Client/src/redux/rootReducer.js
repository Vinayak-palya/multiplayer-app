import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./Slice/userSlice.js";
import chatReducers from "./Slice/chatSlice.js";
const rootReducer = combineReducers({
  user: userReducers,
  chat: chatReducers,
});

export default rootReducer;