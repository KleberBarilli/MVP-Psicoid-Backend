import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkPrisma = () => {
	try {
		prisma.$connect();
		console.log("Prisma connected");
	} catch (err) {
		console.log("Prisma failed to connect");
	}
};
