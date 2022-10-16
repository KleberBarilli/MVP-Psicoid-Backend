import mongoose from "mongoose";

export const checkMongo = () => {
	mongoose.connect(process.env.MONGODB_URI || "");
};

mongoose.connection.once("open", () => console.log("Mongooose connected"));
mongoose.connection.on("error", () => console.error("Mongoose failed to connect"));
