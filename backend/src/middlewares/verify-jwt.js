import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../constants/auth.constants.js";
import User from "../models/user.model.js";
import { UnauthorizedError } from "../utils/api-errors.js";

async function verifyJwt(req, res, next) {
    try {
        const acc_token =
            req.cookies?.acc_token ||
            req.header("Authorization").replace("Bearer", "");


        const decoded = jwt.verify(acc_token, JWT_ACCESS_SECRET);

        req.userId = decoded._id;
        req.email = decoded.email;
        req.username = decoded.username;
        return next();
    } catch (err) {
        next(new UnauthorizedError(err.message));
    }
}  

export default verifyJwt;
