import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("MONGODB URL NOT FOUND");
    if (isConnected) return console.log("Already connected to MONGODB");

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log("Connected to MONGODB");
    } catch (error) {
        console.log(error);
    }
};
