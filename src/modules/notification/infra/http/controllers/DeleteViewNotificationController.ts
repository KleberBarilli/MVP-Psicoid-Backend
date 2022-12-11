import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteNotificationService } from "../../../services/DeleteViewNotificationService";

export class DeleteNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const { profile, profileId } = req.user;

			const service = container.resolve(DeleteNotificationService);
			await service.execute({ notificationId: id, profile, profileId });

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar a notificação" });
		}
	}
}
