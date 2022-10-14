import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateReviewService from "@modules/review/services/CreateReviewService";
import { validateReview } from "@shared/utils/validators/Review";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { ValidationError } from "yup";

export default class CreateReviewController {
	public async handle(req: Request, res: Response): Promise<Response> {
		try {
			const {
				review: { psychologistId, rating, comment },
			} = req.body;
			const { profileId } = req.user;

			await validateReview({ rating, comment });

			const service = container.resolve(CreateReviewService);
			const review = await service.execute({
				pacientId: profileId,
				psychologistId,
				rating,
				comment,
			});

			return res.status(201).json({
				message: "Review adicionada com sucesso",
				data: review,
			});
		} catch (error) {
			if (error instanceof ValidationError) {
				return sendBadRequest(req, res, error.message, 400);
			}
			return res.status(500).json({ error: "Internal Error" });
		}
	}
}
