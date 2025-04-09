import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORS_ORIGIN } from "./constants/env.constants.js";
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json()); // parses incoming json to body in req
app.use(express.urlencoded({ extended: true })); // parses the data encrypted in urls
app.use(express.static("public"));

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// route imports
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
// routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
export default app;
