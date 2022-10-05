import { Request, Response } from "express";
import { container } from "tsyringe";
import ListReviewsByPsicoService from "../../../services/ListReviewsByPsicoService";

export default class ListReviewsByPsicoController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const { pagination } = req;
			const service = container.resolve(ListReviewsByPsicoService);
			const reviews = await service.execute(id, pagination);
			return res.status(200).json({ data: reviews });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar as reviews" });
		}
	}
}
