import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemovePsychologistService } from "@modules/customer/services/RemovePsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class RemovePsychologistController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const { profileId } = req.user;
			const { psychologistId } = req.body;

			const service = container.resolve(RemovePsychologistService);
			await service.execute({
				customerId: profileId,
				psychologistId,
			});

			res.status(HTTP_STATUS_CODE.NO_CONTENT).json({
				message: "Removido com sucesso",
			});
			next();
		} catch (error) {
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
