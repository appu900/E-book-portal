import app from "./app";
import { config } from "./config/config";
import connectToDatabase from "./config/db";

const startServer = async () => {
    await connectToDatabase();
    const port = config.port || 3000;
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
};

startServer();
