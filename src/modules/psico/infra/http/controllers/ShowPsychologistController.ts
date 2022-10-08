import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowPsychologistService from "../../../services/ShowPsychologistService";

export default class ShowPsychologistController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const { latitude, longitude } = req.query;
			const showPsychologist = container.resolve(ShowPsychologistService);
			const [psychologist, distance] = await showPsychologist.execute(id, {
				latitude,
				longitude,
			});
			return res.status(200).json({ data: { ...psychologist, distance } });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar o usuário" });
		}
	}
}
