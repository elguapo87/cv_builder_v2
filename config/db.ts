import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/cv_builder`);

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.log(errMessage);
    }
};

export default DBConnection;