import { Request, Response } from "express";
import { container } from "tsyringe";
import ShowReviewService from "../../../services/ShowReviewService";

export default class ShowReviewController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const service = container.resolve(ShowReviewService);
			const review = await service.execute(id);
			return res.status(200).json({ data: review });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao buscar a review" });
		}
	}
}
