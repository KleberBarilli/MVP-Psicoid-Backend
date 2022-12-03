import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UnsubscribeContactService } from "../../../services/UnsubscribeContactService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import AppError from "@shared/errors/AppError";

export class UnsubscribeContactController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { email, reason } = req.body;

			const service = container.resolve(UnsubscribeContactService);

			const user = await service.execute(email, reason);

			res.status(HTTP_STATUS_CODE.OK).json({ data: user });
			next();
		} catch (err) {
			if (err instanceof AppError) {
				return res
					.status(err.statusCode)
					.json({ message: err.message });
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Erro interno do servidor" });
		}
	}
}
