import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateReviewService from "@modules/review/services/UpdateReviewService";
import { validateReview } from "@shared/utils/validators/Review";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { ValidationError } from "yup";

export default class UpdateReviewController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				review: { rating, comment },
			} = req.body;
			const { id } = req.params;

			await validateReview({ rating, comment });

			const service = container.resolve(UpdateReviewService);
			const review = await service.execute({
				id,
				rating,
				comment,
			});

			return res.status(204).json({
				data: review,
				message: "Review atualizada com sucesso",
			});
		} catch (error) {
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}