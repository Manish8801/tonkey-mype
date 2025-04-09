class ApiResponse {
    constructor(statusCode, result = null, message = "Success") {
        Object.assign(this, {
            statusCode,
            result,
            message,
            success: statusCode < 400,
        });
    }
}
export default ApiResponse;
