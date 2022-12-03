import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import DeleteNotificationService from "../../../services/DeleteViewNotificationService";

export default class DeleteNotificationController {
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

			res.status(200).json({
				message: "Notificação deletada com sucesso",
			});
			next();
		} catch (error) {
			return res
				.status(400)
				.json({ error: "Houve um erro ao buscar a notificação" });
		}
	}
}
