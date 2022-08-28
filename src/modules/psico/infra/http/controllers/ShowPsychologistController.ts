import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowPsychologistService from "../../../services/ShowPsychologistService";

export default class ShowPsychologistController {
	public async show(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const showPsychologist = container.resolve(ShowPsychologistService);
			const psychologist = await showPsychologist.execute(id);
			return res.status(200).json({ data: psychologist });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar o usuário" });
		}
	}
}
