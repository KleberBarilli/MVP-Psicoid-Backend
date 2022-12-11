import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ListNotificationService } from "../../../services/ListNotificationsService";

export class ListNotificationsController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profile, profileId } = req.user;
			const { pagination } = req;

			const service = container.resolve(ListNotificationService);

			const [count, notifications] = await service.execute({
				profile,
				profileId,
				pagination,
			});

			res.status(HTTP_STATUS_CODE.OK).json({
				data: count,
				notifications,
			});
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar as notificações" });
		}
	}
}
