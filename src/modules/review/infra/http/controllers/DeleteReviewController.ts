import { Request, Response } from "express";
import { container } from "tsyringe";
import DeleteReviewService from "../../../services/DeleteReviewService";

export default class DeleteReviewController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params;
			const service = container.resolve(DeleteReviewService);
			await service.execute(id);
			return res.status(200).json({ message: "Review removida com sucesso" });
		} catch (error) {
			return res.status(400).json({ error: "Houve um erro ao remover a review" });
		}
	}
}
