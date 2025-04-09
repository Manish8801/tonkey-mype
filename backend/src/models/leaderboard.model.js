import { Schema, model, Types } from "mongoose";

const leaderboardSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        highestWordsPerMinute: { type: Number, default: 0, min: 0 },
        bestAccuracy: { type: Number, default: 0, min: 0, max: 100 },
    },
    { timestamps: true }
);

const Leaderboard = model("Leaderboard", leaderboardSchema);

export default Leaderboard;
