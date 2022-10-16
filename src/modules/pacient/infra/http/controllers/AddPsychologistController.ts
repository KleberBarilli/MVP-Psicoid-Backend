import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import AddPsychologistService from "@modules/pacient/services/AddPsychologistService";

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
			await service.execute({ pacientId: profileId, psychologistId, selected });
			res.status(200).json({
				message: "Adicionado com sucesso",
			});
			next();
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
