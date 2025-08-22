import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1); 
    }
}