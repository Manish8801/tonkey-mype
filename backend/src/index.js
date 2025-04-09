import "dotenv/config";
import { PORT } from "./constants/env.constants.js";
import app from "./app.js";
import connectDB from "./config/db.config.js";

(async () => {
    try {
        app.listen(PORT, () => {
            console.log("Server listening on port " + PORT);
        });
        await connectDB();
    } catch (err) {
        console.log(err.message);
    }
})();
