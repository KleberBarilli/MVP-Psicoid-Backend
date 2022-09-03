import ListPsychologistsService from "@modules/psico/services/ListPsychologistsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListPsychologistsController {
	public async showAll(req: Request, res: Response): Promise<Response> {
		try {
			const service = container.resolve(ListPsychologistsService);
			const psychologists = await service.listAll();
			return res.status(200).json({ data: psychologists });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar" });
		}
	}
	public async showByCity(req: Request, res: Response): Promise<Response> {
		try {
			const { city } = req.params;
			const service = container.resolve(ListPsychologistsService);
			const psychologists = await service.listByCity(city);
			return res.status(200).json({ data: psychologists });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar" });
		}
	}
}
