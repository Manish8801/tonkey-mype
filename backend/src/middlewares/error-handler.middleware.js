import { NODE_ENV } from "../constants/env.constants.js";
import { ValidationError, ConflictError } from "../utils/api-errors.js";

function errorHandler(err, req, res, next) {
    // mongoose duplication error
    if (err.code === 11000) {
        const duplicateKey = Object.keys(err.keyValue)[0];
        const duplicateValue = err.keyValue[duplicateKey];

        return res
            .status(409)
            .json(
                new ConflictError(
                    `User with ${duplicateKey}: ${duplicateValue} already exists.`
                )
            );
    }
    // mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json(new ValidationError(err.message));
    }

    if (err.isOperational) {
        res.json({
            statusCode: err.statusCode || 500,
            status: err.status,
            name: err.name,
            reason: err.reason,
        });
    } else console.log(err);
}

export default errorHandler;
