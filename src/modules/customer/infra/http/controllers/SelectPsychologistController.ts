import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SelectPsychologistService } from "@modules/customer/services/SelectPsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";
import { AppError } from "@shared/errors/AppError";

export class SelectPsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;
			const { psychologistId } = req.body;

			const service = container.resolve(SelectPsychologistService);
			await service.execute({
				customerId: profileId,
				psychologistId,
			});

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			if (error instanceof AppError) {
				return res
					.status(error.statusCode)
					.json({ message: error.message });
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
