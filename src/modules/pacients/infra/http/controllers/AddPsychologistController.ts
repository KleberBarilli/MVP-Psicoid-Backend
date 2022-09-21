import { Request, Response } from "express";
import { container } from "tsyringe";
import AddPsychologistService from "@modules/pacients/services/AddPsychologistService";

export default class AddPsychologistController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { pacientId, psychologistId } = req.body;

			const service = container.resolve(AddPsychologistService);
			await service.execute({ pacientId, psychologistId });
			return res.status(200).json({
				message: "Psicólogo adicionado com sucesso",
			});
		} catch (error) {
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
