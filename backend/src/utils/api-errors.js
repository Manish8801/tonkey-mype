class AppError extends Error {
    constructor(statusCode, message) {
        super(message);

        Object.assign(this, {
            statusCode,
            status: statusCode >= 400 && statusCode < 500 ? "failed" : "error",
            name: this.constructor.name,
            isOperational: true,
            reason: message,
        });

        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(400, message);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(404, message);
    }
}
class ConflictError extends AppError {
    constructor(message) {
        super(409, message);
    }
}
class UnauthorizedError extends AppError {
    constructor(message) {
        super(401, message);
    }
}

class UnknownError extends AppError {
    constructor(message = "Unexpected server error occurred") {
        super(500, message);
    }
}

export {
    ValidationError,
    NotFoundError,
    ConflictError,
    UnauthorizedError,
    UnknownError,
};
