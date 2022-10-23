import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

export const checkMongo = () => {
	mongoose.connect(process.env.MONGODB_URI || "");
};

mongoose.connection.once("open", () => console.log("Mongooose connected"));
mongoose.connection.on("error", () => console.error("Mongoose failed to connect"));

const prisma = new PrismaClient();

export const checkPrisma = () => {
	try {
		prisma.$connect();
		console.log("Prisma connected");
	} catch (err) {
		console.log("Prisma failed to connect");
	}
};
