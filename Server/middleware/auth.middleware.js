import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/userModel.js"
import jwt from "jsonwebtoken"
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
        if(!token)
        {
            throw new ApiError(401 , "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if(!user)
        {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);

        // Forward error to the error-handling middleware
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json(new ApiError({ message: "Invalid Token" }));
        } else if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ message: "Internal Server Error" });
    }
})