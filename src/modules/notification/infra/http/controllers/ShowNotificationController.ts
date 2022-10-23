import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import ShowNotificationService from "../../../services/ShowNotificationService";

export default class ShowNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const service = container.resolve(ShowNotificationService);
			const notification = await service.execute(id);
			res.status(200).json({ data: notification });
			next();
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar a notificação" });
		}
	}
}
