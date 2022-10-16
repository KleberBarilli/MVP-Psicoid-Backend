import { checkMongo } from "src/database/mongoose";
import { checkPrisma } from "src/database/prisma";
import { app } from "./app";

app.listen(process.env.PORT, () => {
	checkPrisma();
	checkMongo();
	console.info(`Rodando na porta ${process.env.PORT}`);
});
