import ListPsychologistsService from "@modules/psico/services/ListPsychologistsService";
import { Request, Response } from "express";
import { container } from "tsyringe";
export default class ListPsychologistsController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { pagination } = req;
			const service = container.resolve(ListPsychologistsService);
			const [count, psychologists] = await service.execute(pagination);

			return res.status(200).json({ count, data: psychologists });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar" });
		}
	}
}
