import express from "express";
import {
    getUsers,
    checkUsernameAvailability,
} from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/verify-jwt.js";
import { updateUserDetails } from "../controllers/auth.controller.js";

const router = express.Router();

// protect routes
router.get("/get-users", verifyJwt, getUsers);
router.post("/update-user", verifyJwt, updateUserDetails);
router.post("/check-username-availability", checkUsernameAvailability);
export default router; 