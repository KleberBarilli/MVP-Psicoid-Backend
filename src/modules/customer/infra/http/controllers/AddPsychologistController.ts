import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import AddPsychologistService from "@modules/customer/services/AddPsychologistService";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export default class AddPsychologistController {
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

			res.status(HTTP_STATUS_CODE.NO_CONTENT).json({
				message: "Adicionado com sucesso",
			});
			next();
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
