import User from "../models/user.model.js";
import { ValidationError } from "../utils/api-errors.js";
import asyncRouteHandler from "./../utils/async-route-handler.js";
import ApiResponse from './../utils/api-response.js';

const getUsers = asyncRouteHandler(async (req, res) => {
    const users = await User.find().select("-password -refreshToken");

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

const checkUsernameAvailability = asyncRouteHandler(async (req, res) => {
    const { username } = req.body;
    if (!username) throw new ValidationError("Username is required");

    const exists = await User.findOne({ username }, { _id: 1 });

 
    res.status(200).json(
        new ApiResponse(
            200,
            !exists,
            `${username} ${!exists ? "" : "not "}available`
        )
    );
});

export { getUsers, checkUsernameAvailability };
