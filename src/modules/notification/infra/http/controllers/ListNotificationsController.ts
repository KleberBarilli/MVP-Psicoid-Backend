import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import ListNotificationService from "../../../services/ListNotificationsService";

export default class ListNotificationsController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profile, profileId } = req.user;
			const { pagination } = req;

			const service = container.resolve(ListNotificationService);

			const [count, notifications] = await service.execute(profile, profileId, pagination);

			res.status(200).json({ data: count, notifications });
			next();
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar as notificações" });
		}
	}
}
