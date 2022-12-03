import ListTherapeuticApproachesService from "@modules/psico/services/ListTherapeuticApproachesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ListTherapeuticApproachesController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { pagination } = req;
			const service = container.resolve(ListTherapeuticApproachesService);
			const [count, approaches] = await service.execute(pagination);

			return res.status(200).json({ count, data: approaches });
		} catch (error) {
			return res.status(500).json({ error: "Houve um erro ao listar" });
		}
	}
}
