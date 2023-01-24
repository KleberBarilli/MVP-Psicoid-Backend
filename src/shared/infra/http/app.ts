import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import morgan from "morgan";
import Queue from "../../lib/bull/Queue";
import { routes } from "./routes";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";
import { captureIp } from "./middlewares/captureIp";

export const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(captureIp);
Queue.process();
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
	}
	return res.status(500).json({
		status: "error",
		message: error.message,
	});
});
