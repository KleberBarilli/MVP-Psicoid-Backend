import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import mongoose from '../mongoose';
import AppError from '../../errors/AppError';

mongoose();
const app = express();

app.use(cors);
app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}
	return res.status(500).json({
		status: 'error',
		message: error.message,
	});
});

app.listen(process.env.PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Rodando na porta ${process.env.PORT}`);
});
