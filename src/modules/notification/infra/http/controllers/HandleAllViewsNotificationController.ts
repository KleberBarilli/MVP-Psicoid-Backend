import AppError from "@shared/errors/AppError";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import HandleAllNotificationService from "../../../services/HandleAllViewsNotificationService";

export default class HandleAllNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profile, profileId } = req.user;
			const { action } = req.params;

			const service = container.resolve(HandleAllNotificationService);

			await service.execute(
				profile,
				profileId,
				action.toUpperCase() === "DELETE" ? true : false,
			);
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
