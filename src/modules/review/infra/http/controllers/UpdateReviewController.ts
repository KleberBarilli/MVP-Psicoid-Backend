import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateReviewService } from "@modules/review/services/UpdateReviewService";
import { validateReview } from "@shared/utils/validators/Review";
import { sendBadRequest } from "@shared/errors/BadRequest";
import { ValidationError } from "yup";
import { HTTP_STATUS_CODE } from "@shared/utils/enums";

export class UpdateReviewController {
	public async handle(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response | undefined> {
		try {
			const {
				review: { rating, comment },
			} = req.body;
			const { id } = req.params;

			await validateReview({ rating, comment });

			const service = container.resolve(UpdateReviewService);
			await service.execute({
				id,
				rating,
				comment,
			});
			res.status(HTTP_STATUS_CODE.NO_CONTENT);

			next();
		} catch (error) {
			if (error instanceof ValidationError) {
				return sendBadRequest(
					req,
					res,
					error.message,
					HTTP_STATUS_CODE.BAD_REQUEST,
				);
			}
			return res
				.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
				.json({ error: "Internal Error" });
		}
	}
}
