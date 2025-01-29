import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Apiresponse} from "../utils/ApiResponse.js"
import passport from "passport"



const generateAccessAndRefreshToken  = async (userId) => {
    try {
        const user = await User.findById(userId);
        if(!user)
        {
            throw new ApiError(409, "something went wrong whole findignn the user")
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave:false})
        return {refreshToken, accessToken};

    } catch (error) {
        console.log(error);
    }
};
export const registerUser = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;
    if([email,  username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400,  "All fields are required")
    }

    const existUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existUser)
    {
        throw new ApiError(409, "User with username or email already exist")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if(!avatarLocalPath)
    {
        throw new ApiError(409, "avatar file is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar)
    {
        throw new ApiError(409, "Something went wrong while uploading your avatar")
    }
    const userInstance = await User.create({
        username:username.toLowerCase(),
        email,
        avatar:avatar.url,
        password,
    })
    const createdUser = await User.findById(userInstance._id).select(
        "-password -refreshToken"
    )
    if(!createdUser)
    {
        throw new ApiError(500, "something went wrong while registering the user");
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(createdUser._id);
    const loggedInUser = await User.findById(createdUser._id).select("-passowrd -refreshToken");

    const options = {
        httpOnly:true,
        secure:true,
    };
    return res
           .status(200)
           .cookie("accessToken" , accessToken , options)
           .cookie("refreshToken", refreshToken, options)
           .json(new Apiresponse(200, createdUser, "User created successfully", accessToken, refreshToken));
});

export const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;

    if(!username && !email)
    {
        throw new  ApiError(500, "please enter valid username or email");
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    });
    if(!user)
    {
        throw new ApiError(404, "User not found");
    }
    if (user.googleId) {
        throw new ApiError(400, "User logged in via Google. Please use Google login");
    }
    const ispasswordValid = await user.ispasswordCorrect(password);
    if(!ispasswordValid){
        throw new ApiError("500", "Incorrect user password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-passowrd -refreshToken");

    const options = {
        httpOnly:true,
        secure:true,
    };

    return res
           .status(200)
           .cookie("accessToken" , accessToken , options)
           .cookie("refreshToken", refreshToken, options)
           .json(new Apiresponse(
            200 ,
            {user:loggedInUser , accessToken, refreshToken},
            "userLoggedinSuccessFully"
        ))

});

export const googleLogin = asyncHandler(async (req, res) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res); // Redirects to Google login
});

// Google OAuth Callback
export const googleCallback = asyncHandler(async (req, res) => {
    passport.authenticate('google', {successRedirect: 'http://localhost:5173/login',failureRedirect: 'http://localhost:5173/login' }, async (err, user, info) => {
        if (err || !user) {
            throw new ApiError(500, "Authentication failed");
        }

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };

        // Set the cookies for access and refresh tokens
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new Apiresponse(200, { user, accessToken, refreshToken }, "User logged in via Google successfully"));
    })(req, res);
});
export const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incomingRefreshToken)
    {
        throw new ApiError(401 , "Unauthorized request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY
        )
        const user = await User.findById(decodedToken?._id).select("+refreshToken")
    
        if(!user){
            throw new ApiError(401 , "invalid refresh Token")
        }
        if(incomingRefreshToken !== user?.refreshToken)
        {
            throw new ApiError(401 , "Refresh Token expired or used")
        }
        const options = {
            httpOnly:true,
            secure:true
        }
        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken", refreshToken , options)
        .json(
            new Apiresponse(
                200,
                {
                    accessToken,
                    refreshToken:refreshToken,
                },
                "Access Token refreshed "
            )
        )
    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid refreshToken")
    }

});
export const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    const user = await User.findById(req.user?._id).select("+refreshToken");
    const isPasswordCorrect = user.ispasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword  // database is always in other continent
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new Apiresponse(200, {}, "password changed succesfully"))
});

export const getCurrentUser = asyncHandler(async(req, res) => {

    return res
    .status(200)
    .json(new Apiresponse(200, req.user, "current user fetched successfully"))
});
export const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate
    (
        req.user._id,
        {
            $unset: {
                refreshToken:1//this removes the field from document
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken", options)
    .json(new Apiresponse(200, {}, "UserLogged Out"))
})