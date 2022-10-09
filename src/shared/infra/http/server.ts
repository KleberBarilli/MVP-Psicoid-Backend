import { app } from "./app";
app.listen(process.env.PORT, () => {
	console.info(`Rodando na porta ${process.env.PORT}`);
});
