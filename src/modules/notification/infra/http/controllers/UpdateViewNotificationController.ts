import { AppError } from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateNotificationService } from "../../../services/UpdateViewNotificationService";

export class UpdateViewNotificationController {
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
				notificationId: Number(id),
				profile,
				profileId,
				readAt: read.toUpperCase() === "READ" ? new Date() : undefined,
			});
			res.status(HTTP_STATUS_CODE.NO_CONTENT);
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
			return res
				.status(HTTP_STATUS_CODE.NO_CONTENT)
				.json({ error: "Houve um erro interno" });
		}
	}
}
