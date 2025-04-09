import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ValidationError } from "../utils/api-errors.js";
import {
    ACCESS_TOKEN_EXPIRY,
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    PASSWORD_REGEX,
    REFRESH_TOKEN_EXPIRY,
    SALT_ROUNDS,
    TOKEN_ISSUER,
} from "./../constants/auth.constants.js";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 100,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            minLength: 8,
            required: true,
            trim: true,
        },
        refreshToken: {
            type: String,
        },
        avatar: {
            type: String,
        },
        timeTyping: { type: Number, default: 0, min: 0 },
        testsStarted: { type: Number, default: 0, min: 0 },
        testsCompleted: { type: Number, default: 0, min: 0 },
        highestWordsPerMinute: { type: Number, default: 0, min: 0 },
        bestAccuracy: { type: Number, default: 0, min: 0, max: 100 },
        totalWordsTyped: { type: Number, default: 0, min: 0 },
        preferences: {
            theme: { type: String, enum: ["light", "dark"], default: "dark" },
            fontSize: { type: Number, default: 16, min: 10, max: 36 },
        },
        testHistory: [{ type: Schema.Types.ObjectId, ref: "Test" }],
    },
    { timestamps: true }
);

["save", "findOneAndUpdate", "findByIdAndUpdate"].forEach((hook) => {
    userSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            if (!PASSWORD_REGEX.test(this.password)) {
                next(
                    new ValidationError(
                        "Password must contain at least one lowercase, one uppercase, one number, and one special character"
                    )
                );
            }
            const hashed = await bcrypt.hash(this.password, +SALT_ROUNDS);
            this.password = hashed;
        }
        if (this.isModified("fullName")) {
            if (!/^[A-Za-z\s]+$/.test(this.fullName)) {
                next(
                    new ValidationError(
                        "Full name can only contain letters and spaces"
                    )
                );
            }
        }
        if (this.isNew || this.isModified("avatar")) {
            if (!this.avatar) {
                const baseAvatarUrl =
                    "https://avatar.iran.liara.run/username?username=";
                const namesFirstLetter = this.fullName
                    .split(" ")
                    .map((names) => names.trim()[0].toUpperCase());

                if (namesFirstLetter.length > 1) {
                    this.avatar = `${baseAvatarUrl}${namesFirstLetter[0]}+${namesFirstLetter[1]}&bold=true`;
                } else {
                    this.avatar = `${baseAvatarUrl}${namesFirstLetter[0]}&bold=true`;
                }
            }
        }
        next();
    });
});
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
    const { _id, email, username, fullName } = this;

    return jwt.sign({ _id, email, username, fullName }, JWT_ACCESS_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
        issuer: TOKEN_ISSUER,
    });
     
    
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, JWT_REFRESH_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
        issuer: TOKEN_ISSUER,
    });
};

const User = model("User", userSchema);

export default User;
