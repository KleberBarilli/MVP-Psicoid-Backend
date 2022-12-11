import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddPsychologistService } from "@modules/customer/services/AddPsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class AddPsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;
			const { psychologistId, selected } = req.body;

			const service = container.resolve(AddPsychologistService);
			await service.execute({
				customerId: profileId,
				psychologistId,
				selected,
			});

			res.status(HTTP_STATUS_CODE.NO_CONTENT);
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
