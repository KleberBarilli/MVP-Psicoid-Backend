import AppError from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import UpdateNotificationService from "../../../services/UpdateViewNotificationService";

export default class UpdateNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id, read } = req.params;
			const { profile, profileId } = req.user;
			const service = container.resolve(UpdateNotificationService);
			await service.execute({
				notificationId: id,
				profile,
				profileId,
				isRead: read.toUpperCase() === "READ" ? true : false,
			});
			res.status(200).json({
				message: "Notificação atualizada com sucesso",
			});
			next();
		} catch (error) {
			if (error instanceof AppError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					error.statusCode,
				);
			}
			return res.status(500).json({ error: "Houve um erro interno" });
		}
	}
}
