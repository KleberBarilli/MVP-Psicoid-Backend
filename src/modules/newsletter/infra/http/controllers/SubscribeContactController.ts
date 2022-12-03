import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SubscribeContactService } from "../../../services/SubscribeContactService";
import AppError from "@shared/errors/AppError";
import { validateContactMongo } from "@shared/utils/validators/Contact";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class SubscribeContactController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { name, email } = req.body;

			await validateContactMongo({ name, email });

			const service = container.resolve(SubscribeContactService);

			const user = await service.execute({
				name,
				email,
			});
			res.status(HTTP_STATUS_CODE.OK).json({ data: user });
			next();
		} catch (err) {
			if (err instanceof AppError) {
				return res
					.status(err.statusCode)
					.json({ message: err.message });
			}
			return res
				.status(500)
				.json({ error: "Erro se cadastrar na newsletter" });
		}
	}
}
