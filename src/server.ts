import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

const app = express();

app.listen(3333, () => {
	console.log(`Rodando na porta ${process.env.PORT}`);
});
