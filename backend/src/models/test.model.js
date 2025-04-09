import { Schema, model } from "mongoose";

const testSchema = new Schema(
    {
        userId : {type : Schema.Types.ObjectId, ref: "User"},
        raw: { type: Number, required: true, min: 0 },
        wpm: { type: Number, required: true, min: 0 },
        accuracy: { type: Number, required: true, min: 0 },
        consistency: { type: Number, default: 0, min: 0 },
        correct: { type: Number, min: 0, default: 0 },
        incorrect: { type: Number, min: 0, default: 0 },
        extra: { type: Number, min: 0, default: 0 },
        missed: { type: Number, min: 0, default: 0 },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);
const Test = model("Test", testSchema);
export default Test;
