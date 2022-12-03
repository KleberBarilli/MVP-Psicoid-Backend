import { checkMongo, checkPrisma } from "src/shared/checkDb";

import { app } from "./app";

app.listen(process.env.PORT, () => {
	checkPrisma();
	checkMongo();
	console.info(`Rodando na porta ${process.env.PORT}`);
});
