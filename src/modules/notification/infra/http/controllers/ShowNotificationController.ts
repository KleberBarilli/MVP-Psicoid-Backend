import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ShowNotificationService } from "../../../services/ShowNotificationService";

export class ShowNotificationController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { id } = req.params;
			const service = container.resolve(ShowNotificationService);
			const notification = await service.execute(id);
			res.status(HTTP_STATUS_CODE.OK).json({ data: notification });
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Houve um erro ao buscar a notificação" });
		}
	}
}
