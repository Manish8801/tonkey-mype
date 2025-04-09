export const ADMIN_URL = process.env.ADMIN_URL;
export const CLOUD_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUD_SECRET_KEY = process.env.CLOUDINARY_API_SECRET;
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const MONGO_URI = process.env.MONGODB_URI;
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 5000;
export const LOG_LEVEL = NODE_ENV === "production" ? "warn" : "error";
