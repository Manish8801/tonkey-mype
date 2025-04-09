import express from "express";
import {
    checkAuth,
    login,
    logout,
    refreshToken,
    registerUser,
    updateUserDetails,
} from "../controllers/auth.controller.js";
import verifyJwt from "../middlewares/verify-jwt.js";
import upload from './../middlewares/multer.middleware.js';
const router = express.Router();

router.post("/refresh-token", refreshToken);
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", login);
router.post("/logout", verifyJwt, logout);
router.post("/update-me", verifyJwt, updateUserDetails);
router.get("/me", verifyJwt,checkAuth);

export default router;
