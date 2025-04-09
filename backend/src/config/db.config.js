import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.constants.js";

async function connectDB() {
    try {
        const start = performance.now();
        const conn = await mongoose.connect(MONGO_URI);
        console.log(
            `Database connected successfully\nConnection took : ${Math.floor(performance.now() - start)}ms\nHost : ${conn.connection.host}`,
            conn.connection.host
        );
    } catch (err) {
        console.log("Error in database connection", err.message);
        process.exit(1); // we can't proceed without database
    }
}

export default connectDB;
