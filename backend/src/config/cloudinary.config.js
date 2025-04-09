import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
    CLOUD_API_KEY,
    CLOUD_NAME,
    CLOUD_SECRET_KEY,
} from "./../constants/env.constants.js";

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_SECRET_KEY,
});

const uploadImage = async (filePath) => {
    try {
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
        });
        return res.secure_url;
    } catch (err) {
        console.log("Error occurred in image uploader", err.message);
    } finally {
        fs.unlinkSync(filePath);
    }
};

export default uploadImage;
