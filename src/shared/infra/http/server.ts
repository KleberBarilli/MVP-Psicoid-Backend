import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import routes from './routes';
import '../../container';
import AppError from '../../errors/AppError';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(routes);

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
	console.log(`Rodando na porta ${process.env.PORT}`);
});
