import User from "../models/user.model.js";
import {
    NotFoundError,
    UnauthorizedError,
    UnknownError,
    ValidationError,
} from "../utils/api-errors.js";
import asyncRouteHandler from "../utils/async-route-handler.js";
import { JWT_REFRESH_SECRET } from "../constants/auth.constants.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/api-response.js";
import uploadImage from "./../config/cloudinary.config.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) throw new NotFoundError("User not found");

        const [accessToken, refreshToken] = await Promise.all([
            user.generateAccessToken(),
            user.generateRefreshToken(),
        ]);

        return { accessToken, refreshToken };
    } catch (err) {
        if ((!err) instanceof NotFoundError) {
            throw new UnknownError(
                500,
                "Error occurred while refreshing token"
            );
        }
    }
};
const registerUser = asyncRouteHandler(async (req, res) => {
    const { fullName, username, email, password, preferences } = req.body;

    const missingFields = ["fullName", "username", "email", "password"].filter(
        (field) => !req.body[field] || req.body.field === ""
    );

    if (missingFields.length > 0) {
        throw new ValidationError(
            `Missing fields: ${missingFields.join(", ")}`
        );
    }
    const avatarFilePath = req.file?.path;
    let avatar;

    if (avatarFilePath) {
        avatar = await uploadImage(avatarFilePath);
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password,
        preferences,
        avatar,
    });

    if (!user) {
        throw new UnknownError();
    }

    const createdUser = await User.findOne({ email: user.email }).select(
        "-password"
    );

    res.status(201).json(new ApiResponse(201, createdUser, "User created"));
});
const login = asyncRouteHandler(async (req, res) => {
    const { username, email, password, rememberMe = false } = req.body;

    if (!username && !email) {
        throw new ValidationError("Username or email is required.");
    }

    const user = await User.findOne({
        $or: [{ username: username?.trim() }, { email: email?.trim() }],
    });

    if (!user) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const isPasswordCorrect = user.matchPassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const options = {
        httpOnly: true,
        secure: false,
    };

    if (rememberMe) {
        const loggedInUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: { refreshToken },
            },
            { new: true, fields: "-password -refreshToken" }
        );

        return res
            .status(200)
            .cookie("acc_token", accessToken, options)
            .cookie("ref_token", refreshToken, options)

            .json(new ApiResponse(200, loggedInUser, "Login successful"));
    }

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    

    res.status(200)
        .cookie("acc_token", accessToken, options)
        .json(new ApiResponse(200, loggedInUser, "Login successful"));
});
const logout = asyncRouteHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.userId, {
        $unset: { refreshToken: 1 },
    }).select();
    const options = {
        httpOnly: true,
        secure: false,
    };
    res.status(200)
        .clearCookie("acc_token", options)
        .clearCookie("ref_token", options)
        .json(new ApiResponse(200, {}, "Logout successful"));
});
const updateUserDetails = asyncRouteHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findOne({ _id: req.userId });

    const updates = ["fullName", "email", "username"].reduce((acc, field) => {
        if (field && field !== "") {
            acc[field] = req.body[field];
        }
        return acc;
    }, {});

    if (oldPassword && newPassword === confirmPassword) {
        const isPasswordCorrect = await user.matchPassword(oldPassword);
        if (isPasswordCorrect) updates.password = newPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {
            $set: updates,
        },
        { new: true, fields: "-password -refreshToken" }
    );

    if (!updatedUser) {
        throw new NotFoundError("User not found");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "User updated"));
});

const refreshToken = asyncRouteHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.ref_token || req.body.ref_token;

    if (!incomingRefreshToken)
        throw new UnauthorizedError("Unauthorized request");
    try {
        const decoded = jwt.verify(incomingRefreshToken, JWT_REFRESH_SECRET);
        if (!decoded._id) throw new UnauthorizedError("Invalid refresh token");

        const user = await User.findById(decoded._id);
        if (!user) throw new NotFoundError("User not found");

        if (incomingRefreshToken !== user.refreshToken) {
            throw new UnauthorizedError("Refresh token is expired or used");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: false,
        };

        res.status(200)
            .cookie("acc_token", accessToken, options)
            .cookie("ref_token", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Token refreshed"
                )
            );
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            throw new UnauthorizedError(err.message);
        }
        res.status(500).json(new UnknownError(500, err.message));
    }
});

const checkAuth = asyncRouteHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, await User.findById(req.userId), "Logged in")
    );
});

export {
    registerUser,
    login,
    logout,
    updateUserDetails,
    refreshToken,
    checkAuth,
};
